const Event = require("./event.model");

test("add new incomplete(Event Image) event to the database", async () => {
  const incompleteData = new Event({
    EventName: "Wedding",
    EventType: "Wedding",
    EventDate: "2022-10-27",
    ClientName: "John",
    EventStartTime: "19:18",
    EventEndTime: "23:18",
    NoOfParticipants: "70",
    EventStatus: "Available",
    EventLocation: "Hall 01",
    EventDescription: "Wedding"
  });

  try {
    await incompleteData.save();
  } catch (error) {
    expect(error.errors.EventImage).toBeDefined();
  }
});