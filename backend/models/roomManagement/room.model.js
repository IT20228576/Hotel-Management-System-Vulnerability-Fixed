const { number } = require("joi");
const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
  {
    roomName: { type: String, required: true },
    roomNumber: { type: Number, required: true },
    image: { type: String, required: true },
    roomPrice: { type: Number,required: true },
    roomType: { type: String,required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model('Room', RoomSchema);
