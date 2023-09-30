import React, { useEffect, useState } from "react";
import "../layout/Styles/PopUpStyles.css";
import { Modal, Button, Table } from "react-bootstrap";

function PopUpView(props) {
  const [roomDetails, setroomDetails] = useState([]);

  const { details } = props;


  useEffect(() => {
    var datalist = [];
    datalist.push({
      roomName: details.roomName,
      roomNumber: details.roomNumber,
      roomType: details.roomType,
      roomPrice: details.roomPrice,
      description: details.description
    });

    setroomDetails(datalist);
  }, [details]);

  var listData = roomDetails.map((item) => {
    return (
      <tbody key={item._id}>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Room Name</b>
          </td>
          <td>{item.roomName}</td>
        </tr>
        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Room Number</b>
          </td>
          <td>{item.roomNumber}</td>
        </tr>

        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Room Type</b>
          </td>
          <td>{item.roomType}</td>
        </tr>

        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Room Price</b>
          </td>
          <td>{item.roomPrice}</td>
        </tr>


        <tr>
          <td style={{ backgroundColor: "#D3D3D3" }}>
            <b>Description</b>
          </td>
          <td>{item.description}</td>
        </tr>

      </tbody>
    );
  });

  return (
    <>
      <Modal
        dialogClassName="my-modal"
        show={true}
        onHide={props.handleModalClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>View Rooms</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered responsive>
            {listData}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpView;