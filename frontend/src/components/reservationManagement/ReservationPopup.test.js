import React from "react";
import { render, screen } from "@testing-library/react";
import ReservationPopup from "./ReservationPopup";

describe("ReservationPopup", () => {
  
  /* Test Case1 */
  it("Should renders successfully", () => {
    const reservationInfo = {}
    const handleModalClose = () => {}
    render(<ReservationPopup
        handleModalClose = {handleModalClose}
        reservationInfo = {reservationInfo}
    />)
  });

  /* Test Case2 */
  it("Should have the close button when rendering", () => {
    const reservationInfo = {}
    const handleModalClose = () => {}
    render(<ReservationPopup
        handleModalClose = {handleModalClose}
        reservationInfo = {reservationInfo}
    />)

    const result = screen.getByText('Close', { selector: 'button' })
    expect(result).toBeInTheDocument()
  });
});
