const express = require("express");
const router = express.Router();
const { addRoom, editRoom, getRooms, getRoom, getSingleRoom, deleteRoom, searchRoom, RoomSelected } = require("../../controllers/room")
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

router.route("/room/get").get(getRooms);
router.route("/room/getOne/:id").get(getSingleRoom);
router.route("/room/create").post(upload.single('image'), addRoom);
router.route("/room/update/:id").put(editRoom);
router.route("/room/getAll").get(getRoom);
router.route("/room/delete/:id").delete(deleteRoom);
router.route("/room/search/:searchTerm").get(searchRoom);
router.get("/select-room/:roomId", RoomSelected);
module.exports = router;

