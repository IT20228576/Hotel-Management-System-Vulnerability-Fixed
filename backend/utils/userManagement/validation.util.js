const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

/* A schema for validating the user registration form. */
const userRegisterSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().label("First Name"),
  lastName: Joi.string().min(2).max(30).required().label("Last Name"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  dob: Joi.string().required().label("Date of Birth"),
  country: Joi.string().required().label("Country"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: passwordComplexity().required().label("Password"),
  passwordVerify: passwordComplexity()
    .valid(Joi.ref("password"))
    .required()
    .label("Password Verify"),
});

/* A schema for validating the user update form. */
const userUpdateSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().label("First Name"),
  lastName: Joi.string().min(2).max(30).required().label("Last Name"),
  mobile: Joi.string().length(10).required().label("Mobile"),
  dob: Joi.string().required().label("Date of Birth"),
  country: Joi.string().required().label("Country"),
}).unknown(true);

/* This is a schema for validating the login form. */
const loginSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: Joi.string().required().label("Password"),
});

/* This is a schema for validating the change password form. */
const changePasswordSchema = Joi.object({
  password: Joi.string().required().label("Current Password"),
  passwordVerify: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Current Password"),
  newPassword: passwordComplexity().required().label("New Password"),
  newPasswordVerify: passwordComplexity()
    .valid(Joi.ref("newPassword"))
    .required()
    .label("Confirm New Password"),
}).unknown(true);

/* A schema for validating the admin registration form. */
const createUserSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().label("First Name"),
  lastName: Joi.string().min(2).max(30).required().label("Last Name"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  userType: Joi.string()
    .valid("Customer", "Admin")
    .required()
    .label("User Type"),
}).unknown(true);

/* A schema for validating the admin registration form. */
const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail")
}).unknown(true);

module.exports = {
  userRegisterSchema,
  userUpdateSchema,
  loginSchema,
  changePasswordSchema,
  createUserSchema,
  forgotPasswordSchema,
};
