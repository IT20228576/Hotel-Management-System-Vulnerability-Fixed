import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'
import { Col, Row, Button, Form, Container } from "react-bootstrap";


const UpdateEvent = () => {

  const { setUPdata } = useContext(updatedata)

  const navigate = useNavigate("");

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

  const setdata = (e) => {
   
    const { name, value } = e.target;
    setINP((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

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
      console.log("Please enter all event details")
      return 0;
    } else {
      setINP(data)
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateevent = async (e) => {
    e.preventDefault();

    const { EventName, EventType, EventStartTime, EventEndTime, ClientName, NoOfParticipants, EventDate, EventStatus, EventLocation, EventDescription, EventImage } = inpval;

    const res2 = await fetch(`http://localhost:8000/event/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        EventName, EventType, EventStartTime, EventEndTime, ClientName, NoOfParticipants, EventDate, EventStatus, EventLocation, EventDescription, EventImage
      })
    });

    const data2 = await res2.json();
   

    if (res2.status === 422 || !data2) {
      alert("Please enter all event details");
    }else if(NoOfParticipants>100){
      alert("Maximum Partipants are 100")
    }else if(inpval.ClientName.length>20){
      alert("Client name should be less than 20 characters")
    }else if(inpval.EventDescription.length>100){
      alert("Event description should be less than 100 characters")
    } else {
      alert("Update Event Details Successfully")
      navigate("/view")
      setUPdata(data2);
    }
  }

  return (
    <div style={{ marginLeft: "100px", marginTop: "10px", marginBottom: "100px" }}>
      <Container>
        <h1>Update Event - {inpval.EventName}</h1>
        <hr></hr>
        <form className="formCard" border="dark">
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Event Name *</Form.Label>
                <Form.Control value={inpval.EventName} onChange={setdata} name="EventName" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Date *</Form.Label>
                <Form.Control type='date' value={inpval.EventDate} onChange={setdata} name="EventDate" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event Start Time *</Form.Label>
                <Form.Control type='time' value={inpval.EventStartTime} onChange={setdata} name="EventStartTime" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>No Of Participants *</Form.Label>
                <Form.Control value={inpval.NoOfParticipants} onChange={setdata} name="NoOfParticipants" />
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

              <NavLink to={`/view`}><Button variant="secondary" size="lg" style={{ width: "100%" }}>
                Back
              </Button></NavLink>
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
                <Form.Control value={inpval.ClientName} onChange={setdata} name="ClientName" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event End Time *</Form.Label>
                <Form.Control type='time' value={inpval.EventEndTime} onChange={setdata} name="EventEndTime" />
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
                <Form.Control type='file' onChange={setdata} name="EventImage" />
              </Form.Group>
              <Button variant="primary" size="lg" type="submit" style={{ width: "100%" }} onClick={updateevent}>
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

export default UpdateEvent;





