const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/userManagement/user.model");

/* Loading the environment variables from the .env file. */
dotenv.config();

/* Connecting to the MongoDB database. */
mongoose.connect(
  process.env.DBLINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);

/* Creating an array of admin objects. */
const seedAdmins = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    dob: "2015-01-01",
    mobile: "0112659753",
    country: "vn",
    verified: true,
    passwordHash:
      "$2a$10$kyDfuM.pQv/lbOQlyU.4Geycmv42dnN1O7nrGQku9kxrhwGd0dV9a", //123@Testing
    userType: "Admin",
  },
  {
    firstName: "Michael",
    lastName: "Walker",
    email: "Michael@Walker.com",
    dob: "1997-10-01",
    mobile: "0116856566",
    country: "tw",
    verified: true,
    passwordHash:
      "$2a$10$kyDfuM.pQv/lbOQlyU.4Geycmv42dnN1O7nrGQku9kxrhwGd0dV9a", //123@Testing
    userType: "Admin",
  },
];

/**
 * Delete all users, then insert the seedAdmins array into the database.
 */
const seedDB = async () => {
  try {
    await User.deleteMany({userType: "Admin"});
    await User.insertMany(seedAdmins);
    console.log("Successfully admins seeded to the database.");
  } catch (error) {
    console.error(error);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
