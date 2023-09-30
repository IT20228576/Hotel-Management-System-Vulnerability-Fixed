const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../../models/userManagement/token.model");
const email = require("../../utils/userManagement/email.util");
const service = require("../../utils/userManagement/service.util");
const validation = require("../../utils/userManagement/validation.util");
const User = require("../../models/userManagement/user.model");
const crypto = require("crypto");

/* The above code is a login route. It is checking if the user is verified or not. If the user is not
verified, it is sending a verification email to the user. */
router.post("/login", async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await validation.loginSchema.validateAsync(req.body);

    /* Finding the user by email. */
    const user = await User.findOne({ email: validated.email });

    if (!user) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }

    /* This is checking if the user is verified or not. If the user is not verified, it is sending a
verification email to the user. */
    if (user.verified === false && user.adminCreated === false) {
      const verifyToken = await service.getVerifyToken(user._id);

      await email.sendVeri(user.email, user.name, user._id, verifyToken.token);

      return res.status(401).json({
        errorMessage:
          "Unverified email. Verification Email sent to your email.",
      });
    }

    /* Comparing the password entered by the user with the password stored in the database. */
    const passwordCorrect = await bcrypt.compare(
      validated.password,
      user.passwordHash
    );

    /* This is checking if the password entered by the user is correct or not. If the password is not
correct, it is sending an error message to the user. */
    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    }
    /* This is creating a token for the user. */
    const token = jwt.sign(
      {
        user: user._id,
      },
      process.env.KEY
    );

    // send the token in a HTTP-only cookie
    var expiryTime = new Date(Number(new Date()) + 6 * 60 * 60 * 1000); //after 6 hours cookie will be expire
    return res
      .cookie("token", token, {
        expires: expiryTime,
        secure: true,
        sameSite: "none",
      })
      .send({ type: user.userType, verified: user.verified });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a logout route. It is removing the cookie from the browser. */
router.get("/logout", async (req, res) => {
  /* Removing the cookie from the browser. */
  await service.removeCookie(res);
});

/* This is a route for verifying the email. It is checking if the user is present in the database or
not. If the user is not present in the database, it is sending an error message to the user. If the
user is present in the database, it is checking if the token is present in the database or not. If
the token is not present in the database, it is sending an error message to the user. If the token
is present in the database, it is updating the verified field of the user to true. It is also
removing the token from the database. It is also sending a success email to the user. */
router.get("/verify/:id/:token", async (req, res) => {
  try {
    /* Finding the user by id. */
    const user = await User.findById(req.params.id);

    /* Checking if the user is present in the database or not. If the user is not present in the database,
it is sending an error message to the user. */
    if (!user) {
      return res.status(401).json({ errorMessage: "User not found" });
    }

    /* Finding the token in the database. */
    const token = await Token.findOne({
      userID: user._id,
      token: req.params.token,
    });

    /* Checking if the token is present in the database or not. If the token is not present in the
database, it is sending an error message to the user. */
    if (!token) return res.status(400).json({ errorMessage: "Invalid Link" });

    /* This is updating the verified field of the user to true. */

    await User.findByIdAndUpdate(user._id, {
      verified: true,
    }).exec();

    /* Removing the token from the database. */
    await token.remove();
    return res.status(200).json({ errorMessage: "Successfully Verified!" });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await validation.forgotPasswordSchema.validateAsync(
      req.body
    );

    /* Finding the user by email. */
    const user = await User.findOne({ email: validated.email });

    if (!user) {
      return res.status(401).json({ errorMessage: "Wrong email." });
    }

    /* Generating a random string of length 10. */
    const oneTimePassword = crypto.randomBytes(10).toString("hex");

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(oneTimePassword, salt);

    /* Updating the user account. */
    await User.findByIdAndUpdate(user._id, {
      passwordHash: hashedPassword,
    }).exec();

    /* Sending an verification email to the user. */
    await email.sendPassword(user.email, oneTimePassword);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Check your emails" });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

module.exports = router;
