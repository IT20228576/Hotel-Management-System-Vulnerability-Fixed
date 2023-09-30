const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    EventName: {
        type: String,
        required: true
    },
    EventType: {
        type: String,
        required: true
    },
    EventDate: {
        type: String,
        required: true
    },
    ClientName: {
        type: String,
        required: true
    },
    EventStartTime: {
        type: String,
        required: true
    },
    EventEndTime: {
        type: String,
        required: true
    },
    NoOfParticipants: {
        type: Number,
        required: true
    },

    EventStatus: {

        type: String,
        required: true
    },

    EventLocation: {

        type: String,
        required: true
    },

    EventDescription: {

        type: String,
        required: true
    },

    EventImage: {

        type: String,
        required: true
    }
});

const events = new mongoose.model("events", eventSchema);


module.exports = events;