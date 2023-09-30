import React from "react";
import { render } from "@testing-library/react";
import ViewReservationList from "./ViewReservationList";
import { BrowserRouter } from "react-router-dom";
import mockAxios from "axios";

jest.mock("axios");
window.alert = jest.fn();

const mockData = {
  data: {
    data: [
      {
        _id: "6346c995e4d031b4f3bfcd18",
        referenceNumber: "REF0004",
        firstName: "Amal",
        lastName: "Perera",
        mobile: "0762233445",
        email: "amail@gmail.com",
        roomType: "King room",
        room: "King Guest Room",
        checkinDate: "2022-10-13T00:00:00.000Z",
        checkinTime: "08:30",
        checkoutDate: "2022-10-14T00:00:00.000Z",
        checkoutTime: "08:30",
        adults: 4,
        children: null,
        numberOfRooms: 1,
        amount: "15000",
        paymentMethod: "",
        note: "",
      },
      {
        _id: "63468d78488c49f4c6bd7bdd",
        referenceNumber: "REF0003",
        firstName: "Neha",
        lastName: "Gamage",
        mobile: "0762233000",
        email: "neha@gmail.com",
        roomType: "King room",
        room: "King Guest Room",
        checkinDate: "2022-10-12T00:00:00.000Z",
        checkinTime: "20:00",
        checkoutDate: "2022-10-15T00:00:00.000Z",
        checkoutTime: "20:00",
        adults: 4,
        children: 0,
        numberOfRooms: 3,
        amount: "45000",
        paymentMethod: "Card",
        note: "",
      },
    ],
  },
};

describe("ViewReservationList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  /* Test Case1 */
  it("Should renders successfully", () => {
    render(
      <BrowserRouter>
        <ViewReservationList />
      </BrowserRouter>
    );
  });

  /* Test Case2 */
  it("Should load the reservation list when rendering", async () => {
    render(
      <BrowserRouter>
        <ViewReservationList />
      </BrowserRouter>
    );
    const getAllData = mockAxios.get.mockResolvedValue(mockData);
    const result = await getAllData();
    expect(result).toBe(mockData);
  });
});
