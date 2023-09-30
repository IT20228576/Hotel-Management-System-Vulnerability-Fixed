const express = require("express");
const router = express.Router();
const events = require("../../models/eventManagement/event.model");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../frontend/src/components/eventManagement/EventImages');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }
  
  let upload = multer({ storage, fileFilter });

  
router.post("/event/new",upload.single('EventImage') , async (req, res) => {

     const { EventName, EventType, EventDate, ClientName, EventStartTime, EventEndTime, NoOfParticipants, EventStatus, EventLocation, EventDescription} = req.body;

    if (!EventName || !EventType || !EventDate || !ClientName || !EventStartTime || !EventEndTime || !NoOfParticipants || !EventStatus || !EventLocation) {
        res.status(422).json("Please enter all data")
        return 0;
    } else if (NoOfParticipants > 100) {
        res.status(420).json("Maximum Partipants are 100")
        return 0;
    }else if (ClientName.length > 20) {
        res.status(420).json("Client name should be less than 20 characters")
        return 0;
    }else if (EventDescription.length > 100) {
        res.status(420).json("Event description should be less than 100 characters")
        return 0;
    }else{
    try {
        const addevent = new events({
            EventName: req.body.EventName,
             EventType: req.body.EventType,
              EventDate: req.body.EventDate,
               ClientName: req.body.ClientName,
                EventStartTime: req.body.EventStartTime,
                 EventEndTime: req.body.EventEndTime,
                  NoOfParticipants: req.body.NoOfParticipants,
                   EventStatus: req.body.EventStatus,
                    EventLocation: req.body.EventLocation,
                     EventDescription: req.body.EventDescription,
                      EventImage: req.file.filename
        });

        await addevent.save();
        res.status(201).json(addevent);

    } catch (error) {
        res.status(422).json(error);
    }
}
})

// get event data

router.get("/event/view", async (req, res) => {
    try {
        const pageNo = req.query.pageNo || 1;
        const itemsPerPage = req.query.pageSize || 10;
        const skip = (pageNo - 1) * itemsPerPage;
        const count = await events.estimatedDocumentCount();
        const pageCount = Math.ceil(count / itemsPerPage);

        const geteventdata = await events.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(itemsPerPage);

        res.status(201).json({ pagination: { count, pageCount }, geteventdata })

    } catch (error) {
        return res.status(422).json(error);
    }
})

// get individual event

router.get("/event/vew/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const eventindividual = await events.findById({ _id: id });
        res.status(201).json(eventindividual)

    } catch (error) {
        res.status(422).json(error);
    }
})

// update event data

router.patch("/event/update/:id", async (req, res) => {

    const { EventName, EventType, EventDate, ClientName, EventStartTime, EventEndTime, NoOfParticipants, EventStatus, EventLocation, EventDescription } = req.body;
    if (!EventName || !EventType || !EventDate || !ClientName || !EventStartTime || !EventEndTime || !NoOfParticipants || !EventStatus || !EventLocation) {
        res.status(422).json("Please enter all data")
        return 0;
    }else if (NoOfParticipants > 100) {
        res.status(420).json("Maximum Partipants are 100")
        return 0;
    }else if (ClientName.length > 20) {
        res.status(420).json("Client name should be less than 20 characters")
        return 0;
    }else if (EventDescription.length > 100) {
        res.status(420).json("Event description should be less than 100 characters")
        return 0;
    }
    try {
        const { id } = req.params;

        const updatedevent = await events.findByIdAndUpdate(id, req.body, {
            new: true
        });

        res.status(201).json(updatedevent);

    } catch (error) {
        res.status(422).json(error);
    }
})

// delete event
router.delete("/event/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletevent = await events.findByIdAndDelete({ _id: id })
        res.status(201).json(deletevent);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;










