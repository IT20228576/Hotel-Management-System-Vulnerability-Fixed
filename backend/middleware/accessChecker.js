const jwt = require("jsonwebtoken");
const User = require("../models/userManagement/user.model");

//verify token
/**
 * It checks if the user has a token, if they do, it verifies the token and returns the user's
 * information.
 * @param req - the request object
 * @returns The result of the findById query.
 */
async function checkToken(req) {
  try {
    /* Getting the token from the cookie. */
    const token = req.cookies.token;
    /* Checking if the token is null, if it is, it returns null. */
    if (!token) return null;

    /* Verifying the token. */
    const logged = jwt.verify(token, process.env.KEY);
    /* Finding the user by the id that is in the token. */
    const result = await User.findById(logged.user);

    return result;
  } catch (err) {
    console.error(err);
  }
}

/**
 * It checks if the token is valid and if it is a Admin user, it adds the user to the request body and calls the
 * next function
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns The result of the checkToken function.
 */
async function adminAccess(req, res, next) {
  try {
    /* Checking if the user has a token, if they do, it verifies the token and returns the user's
information. */
    const result = await checkToken(req);

    /* Checking if the user is an admin. */
    if (!result || result.userType !== "Admin") {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    req.body.user = result;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

/**
 * It checks if the token is valid and if it is a Customer user, it adds the user to the request body and calls the
 * next function
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns The result of the checkToken function.
 */
async function customerAccess(req, res, next) {
  try {
    /* Checking if the user has a token, if they do, it verifies the token and returns the user's
information. */
    const result = await checkToken(req);

    /* Checking if the user is a Customer. */
    if (!result || result.userType !== "Customer") {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    req.body.user = result;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

/**
 * It checks if the token is valid and if it is a user, it adds the user to the request body and calls the
 * next function
 * @param req - The request object
 * @param res - The response object
 * @param next - The next middleware function in the stack.
 * @returns The result of the checkToken function.
 */
async function userAccess(req, res, next) {
  try {
    /* Checking if the user has a token, if they do, it verifies the token and returns the user's
information. */
    const result = await checkToken(req);

    /* Checking if the user is a Customer. */
    if (!result) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    req.body.user = result;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = { adminAccess, customerAccess, userAccess };
