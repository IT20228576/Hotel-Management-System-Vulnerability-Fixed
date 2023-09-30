const validate = require("./validation.util");

test("Validate Register User Data", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    mobile: "0111206597",
    dob: "2000-12-31T18:00:00.000Z",
    country: "lk",
    email: "test@gmail.com",
    password: "Password1+",
    passwordVerify: "Password1+",
  };
  expect(validate.userRegisterSchema.validateAsync(data)).resolves.toEqual(
    data
  );
});

test("Validate Register Incomplete User Data", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    mobile: "0111206597",
    dob: "2000-12-31T18:00:00.000Z",
    country: "lk",
    email: "test@gmail.com",
    password: "Password1+",
    passwordVerify: "Passw",
  };
  expect(validate.userRegisterSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});


test("Validate Update User Data", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    mobile: "0111206597",
    dob: "2000-12-31T18:00:00.000Z",
    country: "lk",
  };
  expect(validate.userUpdateSchema.validateAsync(data)).resolves.toEqual(data);
});

test("Validate Update Incomplete User Data", () => {
  const data = {
    firstName: "Kamal",
    mobile: "0111206597",
    dob: "2000-12-31T18:00:00.000Z",
    country: "lk",
  };
  expect(validate.userUpdateSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});


test("Validate Login Data", () => {
  const data = {
    email: "test@gmail.com",
    password: "Password1+"
  };
  expect(validate.loginSchema.validateAsync(data)).resolves.toEqual(data);
});

test("Validate Incomplete Login Data", () => {
  const data = {
    email: "test",
    password: "Password1+",
  };
  expect(validate.loginSchema.validateAsync(data)).rejects.not.toEqual(data);
});


test("Validate Change Password Data", () => {
  const data = {
    password: "Password1+",
    passwordVerify: "Password1+",
    newPassword: "Password2*",
    newPasswordVerify: "Password2*",
  };
  expect(validate.changePasswordSchema.validateAsync(data)).resolves.toEqual(
    data
  );
});

test("Validate Incomplete Change Password Data", () => {
  const data = {
    password: "Password1+",
    passwordVerify: "Password1+",
    newPassword: "Pass",
    newPasswordVerify: "Passwor",
  };
  expect(validate.changePasswordSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});


test("Validate Create User Data", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    email: "test@gmail.com",
    userType: "Customer",
  };
  expect(validate.createUserSchema.validateAsync(data)).resolves.toEqual(data);
});

test("Validate Incomplete Create User Data", () => {
  const data = {
    firstName: "Kamal",
    lastName: "Perera",
    email: "test",
    userType: "Customer",
  };
  expect(validate.createUserSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});


test("Validate Forgot Password Data", () => {
  const data = {
    email: "test@gmail.com",
  };
  expect(validate.forgotPasswordSchema.validateAsync(data)).resolves.toEqual(
    data
  );
});

test("Validate Incomplete Forgot Password Data", () => {
  const data = {
    email: "testgmail",
  };
  expect(validate.forgotPasswordSchema.validateAsync(data)).rejects.not.toEqual(
    data
  );
});