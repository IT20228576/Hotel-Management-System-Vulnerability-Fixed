import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Modal, Button, Table } from "react-bootstrap";
import "../layout/Styles/PopUpStyles.css";

const ViewEvent = () => {

  const [geteventdata, setEventdata] = useState([]);
 

  const { id } = useParams("");
  

  const getdata = async () => {
    const res = await fetch(`http://localhost:8000/event/vew/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();


    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setEventdata(data)
      console.log("get data");
    }
  }

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mt-3" style={{ marginLeft: "100px" }}>
      <Modal
        dialogClassName="my-modal"
        show={true}
        backdrop="static"
      >
        <a href='/view'><Modal.Header closeButton></Modal.Header></a>
        <Modal.Title style={{ textAlign: "center" }}>{geteventdata.EventName}</Modal.Title>
        <br></br>
        <img src={typeof (geteventdata.EventImage) !== 'undefined' ? require(`../eventManagement/EventImages/${geteventdata.EventImage}`) : 'Error'} style={{ width: "400px", height: "300px", margin: "auto" }} alt="Event" />
        <Modal.Body>
          <Table bordered responsive>
            <tbody>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Event ID</b>
                </td>
                <td>E10{id.lastIndexOf() + 4}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Event Type</b>
                </td>
                <td>{geteventdata.EventType}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Event Date</b>
                </td>
                <td>{geteventdata.EventDate}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Client/ Company/ Organization Name</b>
                </td>
                <td>{geteventdata.ClientName}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Event Start Time</b>
                </td>
                <td>{geteventdata.EventStartTime}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Event End Time</b>
                </td>
                <td>{geteventdata.EventEndTime}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>No Of Participants</b>
                </td>
                <td>{geteventdata.NoOfParticipants}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Event Status</b>
                </td>
                <td>{geteventdata.EventStatus}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Event Location</b>
                </td>
                <td>{geteventdata.EventLocation}</td>
              </tr>
              <tr>
                <td style={{ backgroundColor: "#D3D3D3" }}>
                  <b>Event Description</b>
                </td>
                <td>{geteventdata.EventDescription}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <a href='/view'><Button variant="danger">
            Close
          </Button></a>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default ViewEvent
