const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require('body-parser');
const router = require("./routes/eventManagement/event.route");
const room = require("./routes/roomManagement/room")
/* Loading the environment variables from the .env file. */
dotenv.config();

//
// ─── SET UP SERVER ──────────────────────────────────────────────────────────────
//

/* Creating an instance of express. */
const app = express();

/* Setting the port to 8000. */
const PORT = process.env.PORT || 8000;

/* Starting the server on the port 8000. */
app.listen(PORT, () =>
  console.log(`Successfully Server started on : ${PORT}`)
);

/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json());
/* Parsing the cookie and making it available in the req.cookies property. */
app.use(cookieParser());
/* Allowing the server to accept requests from the client. */
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(router);
app.use('/api/', room);

//
// ─── CONNECT TO MONGODB ─────────────────────────────────────────────────────────
//

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

//
// ─── SET UP ROUTES ──────────────────────────────────────────────────────────────
//

//User management routes
app.use("/user", require("./routes/userManagement/user.router"));
app.use("/", require("./routes/userManagement/authentication.router"));

//Reservation Management Routes
app.use("/reservations", require("./routes/reservationManagement/reservation.route"));
