const Room = require("../models/roomManagement/room.model")
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, '../frontend/src/components/image');
  },
  filename: function (_req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (_req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

exports.getRooms = async (req, res) => {
  try {



    const pageNo = req.query.pageNo || 1;

    const itemsPerPage = req.query.pageSize || 10;

    const skip = (pageNo - 1) * itemsPerPage;


    const count = await Room.estimatedDocumentCount();



    const pageCount = Math.ceil(count / itemsPerPage);

    const details = await Room.find({})

      .sort({ createdAt: -1 })

      .skip(skip)

      .limit(itemsPerPage);



    return res.status(200).json({

      pagination: { count, pageCount },

      data: details,

      message: "Fetched All Successfully",

    });

  } catch (error) {

    return res.status(500).json({ message: error });

  }

};
exports.addRoom = async (req, res) => {

  try {
    const newRoom = new Room({
      roomName: req.body.roomName,
      roomNumber: req.body.roomNumber,
      image: req.file.filename,
      roomPrice: req.body.roomPrice,
      roomType: req.body.roomType,
      description: req.body.description,

    });

   await newRoom.save();

    res.status(201).json({ message: "sucess" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getSingleRoom = async (req, res) => {
  const roomid = req.params.id;
  try {
    let rooms = await Room.findOne({ _id: roomid });
    res.json(rooms);
  } catch (err) {
    res.status(400).json({ error: err });
  }

};

exports.getRoom = async (_req, res) => {
  try {
    Room.find().then((Rooms) => {
      res.json(Rooms);
    })
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

exports.editRoom = async (req, res) => {
  try {
    await Room.findByIdAndUpdate(req.params.id, {
      $set: req.body
    });

    res.status(201).json({ message: "sucess" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
     await Room.findByIdAndDelete(req.params.id);

    res.status(201).json({ message: "sucess" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

exports.searchRoom = async (req, res) => {

  try {

    const details = await Room.find({

      $or: [

        {

          roomName: { $regex: req.params.searchTerm },

        },



      ],

    });



    return res.status(200).json({

      data: details,

    });

  } catch (error) {

    return res.status(500).json({ message: error });

  }

}

// return a selected room
exports.RoomSelected = async (req, res) => {
  const { roomId } = req.params;
  if (roomId) {
    Room.findOne({ _id: roomId }).exec((error, details) => {
      if (error) return res.status(400).json({ error });
      if (details) {
        res.status(201).json({ details })
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};