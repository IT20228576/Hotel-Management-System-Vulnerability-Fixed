const Token = require("../../models/userManagement/token.model");
const crypto = require("crypto");

/**
 * It finds a token in the database with the userID of the user that is trying to verify their email,
 * if it finds one it removes it, then it creates a new token and saves it to the database.
 * @param id - The user's id
 * @returns The token is being returned.
 */
async function getVerifyToken(id) {
  try {
    /* Finding a token in the database with the userID of the user that is trying to verify their email. */
    const result = await Token.findOne({ userID: id });

    /* Checking if the result is not null, if it is not null it is removing the result. */
    if (result) await result.remove();

    /* Creating a new token and saving it to the database. */
    const token = await new Token({
      userID: id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    return token;
  } catch (error) {
    throw new TypeError();
  }
}

/**
 * It removes the cookie from the client's browser.
 * @param res - the response object
 */
async function removeCookie(res) {
  try {
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
  } catch (err) {
    res.status(500).send();
    throw new TypeError();
  }
}

module.exports = {
  getVerifyToken,
  removeCookie,
};
