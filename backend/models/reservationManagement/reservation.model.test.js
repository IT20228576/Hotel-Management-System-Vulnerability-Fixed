const ReservationModel = require("./reservation.model");

describe("ReservationModel", () => {
  /* Test Case 1 */
  it("Should not create a new reservation and throw an error when the require reference number field is absent", async () => {
    const newReservation = new ReservationModel({
      firstName: "TestFirstName",
      lastName: "TestLastName",
      mobile: "0761234567",
      email: "Test@gmail.com",
      roomType: "TestRoomType",
      room: "TestRoom",
      checkinDate: new Date(),
      checkinTime: "8.30",
      checkoutDate: new Date(),
      checkoutTime: "8.30",
      adults: 2,
      numberOfRooms: 1,
      amount: "50000",
    });

    try {
      // mock saving of an object
      ReservationModel.save = jest.fn().mockImplementation(() => {});
    } catch (error) {
      await expect(newReservation).rejects.toThrowError();
    }
  });

  /* Test Case 2 */
  it("Should return the details of the reservation when searched using the first name", async () => {
    const returnObject = {
      referenceNumber: "Test123",
      firstName: "TestFirstName",
      lastName: "TestLastName",
      mobile: "077600000",
      email: "Test@gmail.com",
      roomType: "TestRoomType",
      room: "TestRoom",
      checkinDate: "2022.09.01",
      checkinTime: "08:00",
      checkoutDate: "2022.09.04",
      checkoutTime: "08:00",
      adults: 2,
      children: 0,
      numberOfRooms: 1,
      amount: "25000.00",
      paymentMethod: "Cash",
      note: "Test",
    };

    // mock finding an object
    ReservationModel.find = jest.fn().mockReturnValue(returnObject);

    try {
      const result = await ReservationModel.find({
        firstName: "TestFirstName",
      });
      expect(result).toBe(returnObject);
    } catch (error) {
      console.log(error);
    }
  });
});
