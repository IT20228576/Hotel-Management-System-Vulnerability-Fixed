import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Col,
  Row,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import axios from "axios";

const AddEvent = () => {

  const navigate = useNavigate();

  const [inpval, setINP] = useState({
    EventName: "",
    EventType: "",
    EventDate: "",
    ClientName: "",
    EventStartTime: "",
    EventEndTime: "",
    NoOfParticipants: "",
    EventStatus: "",
    EventLocation: "",
    EventDescription: "",
    EventImage: ""
  })

  const addinpdata = async (e) => {
    e.preventDefault();
    const data =new FormData();
    data.append('EventName',inpval.EventName);
    data.append('EventType',inpval.EventType);
    data.append('EventStartTime',inpval.EventStartTime);
    data.append('EventEndTime',inpval.EventEndTime);
    data.append('ClientName',inpval.ClientName);
    data.append('NoOfParticipants',inpval.NoOfParticipants);
    data.append('EventDate',inpval.EventDate);
    data.append('EventStatus',inpval.EventStatus);
    data.append('EventLocation',inpval.EventLocation);
    data.append('EventDescription',inpval.EventDescription);
    data.append('EventImage',inpval.EventImage);

    axios.post("http://localhost:8000/event/new", data).then(()=>{

      if(data){
        alert("Add Event Details Successfully");
      navigate("/view")
      }
      }).catch((err)=>{
        if (!inpval.EventName || !inpval.EventType || !inpval.EventDate || !inpval.ClientName || !inpval.EventStartTime || !inpval.EventEndTime || !inpval.NoOfParticipants || !inpval.EventStatus || !inpval.EventLocation || !inpval.EventDescription || !inpval.EventImage) {
          alert("Please enter all event details")
          return 0;
      }else if(inpval.NoOfParticipants>100){
          alert("Maximum Partipants are 100")
        }else if(inpval.ClientName.length>20){
          alert("Client name should be less than 20 characters")
        }else if(inpval.EventDescription.length>100){
          alert("Event description should be less than 100 characters")
        }
      })
    }
    const setdata = (e) => {
      setINP({...inpval, [e.target.name]: e.target.value});
  }

  const handlePhoto = (e) => {
    setINP({...inpval, EventImage: e.target.files[0]});
  }

  return (
    <div style={{ marginLeft: "100px", marginTop: "10px", marginBottom: "100px" }}>
      <Container>
        <h1 style={{ margin: "2%" }}>Add New Event</h1>
        <hr></hr>
        <form className="formCard" border="dark">
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Event Name *</Form.Label>
                <Form.Control
                  placeholder="Event Name"
                  value={inpval.EventName} onChange={setdata} name="EventName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Date *</Form.Label>
                <Form.Control
                  placeholder="Event Date"
                  type='date'
                  value={inpval.EventDate} onChange={setdata} name="EventDate"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Start Time *</Form.Label>
                <Form.Control
                  type='time'
                  placeholder="Event Start Date"
                  value={inpval.EventStartTime} onChange={setdata} name="EventStartTime"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>No Of Participants *</Form.Label>
                <Form.Control
                  placeholder="No Of Participants"
                  value={inpval.NoOfParticipants} onChange={setdata} name="NoOfParticipants"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Location *</Form.Label>
                <Form.Select aria-label="Default select example" value={inpval.EventLocation} onChange={setdata} name="EventLocation">
                  <option>Event Location</option>
                  <option>Hall 01</option>
                  <option>Hall 02</option>
                  <option>Meeting Room 01</option>
                  <option>Meetng Room 02</option>
                  <option>Outdoor</option>
                </Form.Select>
              </Form.Group>

              <a href="/event/new"><Button variant="secondary" size="lg" style={{ width: "70%", float: "right", margin: "5px" }}>
                Reset
              </Button></a>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Event Type *</Form.Label>
                <Form.Select aria-label="Default select example" value={inpval.EventType} onChange={setdata} name="EventType">
                  <option>Event Type</option>
                  <option>Wedding</option>
                  <option>Meeting</option>
                  <option>Award Ceremony</option>
                  <option>Birthday Party</option>
                  <option>Batch Party</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Client/ Company/ Organization Name *</Form.Label>
                <Form.Control
                  placeholder="Client Name"
                  value={inpval.ClientName} onChange={setdata} name="ClientName"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event End Time *</Form.Label>
                <Form.Control
                  placeholder="Event End Date"
                  type='time'
                  value={inpval.EventEndTime} onChange={setdata} name="EventEndTime"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Status *</Form.Label>
                <Form.Select aria-label="Default select example" value={inpval.EventStatus} onChange={setdata} name="EventStatus">
                  <option>Event Status</option>
                  <option>Available</option>
                  <option>Not Available</option>
                  <option>Postponed</option>
                  <option>Cancelled</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Event Image *</Form.Label>
                <Form.Control
                  placeholder="Event Image"
                  type='file'
                  accept="image/*"
                  onChange={handlePhoto} name="EventImage"
                />
                </Form.Group>

              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{ width: "70%", float: "left", margin: "5px" }}
                onClick={addinpdata}
              >
                Submit
              </Button>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Event Description *</Form.Label>
                <Form.Control
                  placeholder="Event Description"
                  as="textarea"
                  rows={8}
                  value={inpval.EventDescription} onChange={setdata} name="EventDescription"
                />
              </Form.Group>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  )
}
export default AddEvent;