import React, { useEffect, useState } from "react";
import "../layout/Styles/PopUpStyles.css";
import { Modal, Button, Table } from "react-bootstrap";

function ReservationPopup(props) {
  const { handleModalClose, reservationInfo } = props;
  const [reservationDetails, setReservationDetails] = useState([]);

  useEffect(() => {
    var datalist = [];
    datalist.push({
      adults: reservationInfo.adults,
      amount: reservationInfo.amount,
      checkinDate: reservationInfo.checkinDate,
      checkinTime: reservationInfo.checkinTime,
      checkoutDate: reservationInfo.checkoutDate,
      checkoutTime: reservationInfo.checkoutTime,
      children: reservationInfo.children,
      email: reservationInfo.email,
      firstName: reservationInfo.firstName,
      lastName: reservationInfo.lastName,
      mobile: reservationInfo.mobile,
      note: reservationInfo.note,
      numberOfRooms: reservationInfo.numberOfRooms,
      paymentMethod: reservationInfo.paymentMethod,
      referenceNumber: reservationInfo.referenceNumber,
      room: reservationInfo.room,
      roomType: reservationInfo.roomType,
    });

    setReservationDetails(datalist);
  }, [reservationInfo]);

  var listData = reservationDetails.map((item, index) => {
    return (
      <tbody key={index}>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Reference Number</b>
          </td>
          <td>{item.referenceNumber}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Name</b>
          </td>
          <td>{item.firstName + " " + item.lastName}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Phone Number</b>
          </td>
          <td>{item.mobile}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Email</b>
          </td>
          <td>{item.email}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Room Type</b>
          </td>
          <td>{item.roomType}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Room</b>
          </td>
          <td>{item.room}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Number of Adults</b>
          </td>
          <td>{item.adults}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Number of Children</b>
          </td>
          <td>{item.children}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Number of Rooms</b>
          </td>
          <td>{item.numberOfRooms}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Amount ($)</b>
          </td>
          <td>{item.amount}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Payment Method</b>
          </td>
          <td>{item.paymentMethod}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Check-in Date and Time</b>
          </td>
          <td>{item?.checkinDate?.substring(0, 10) + " - " + item.checkinTime}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Check-out Date and Time</b>
          </td>
          <td>
            {item?.checkoutDate?.substring(0, 10) + " - " + item.checkoutTime}
          </td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Notes</b>
          </td>
          <td>{item.note}</td>
        </tr>
      </tbody>
    );
  });

  return (
    <>
      <Modal
        dialogClassName="my-modal"
        show={true}
        onHide={handleModalClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>View Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered responsive>
            {listData}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReservationPopup;
