const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
  {
    referenceNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    roomType: { type: String, required: true },
    room: { type: String, required: true },
    checkinDate: { type: Date, required: true },
    checkinTime: { type: String, required: true },
    checkoutDate: { type: Date, required: true },
    checkoutTime: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, default: 0 },
    numberOfRooms: { type: Number, required: true },
    amount: { type: String, required: true },
    paymentMethod: { type: String, default: "Cash" },
    note: { type: String },
  },
  {
    timestamps: true,
  }
);

const Reservations = mongoose.model("reservations", ReservationSchema);

module.exports = Reservations;
