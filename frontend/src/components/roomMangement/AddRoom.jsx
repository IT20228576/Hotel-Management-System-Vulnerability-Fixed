import React, { useState } from "react";

import {
  Col,
  Row,
  Button,
  Form,
  Container,
} from "react-bootstrap";



import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRoom() {


  const history = useNavigate();

  const [room, setRoom] = useState({
    roomName: "",
    roomNumber: "",
    image: "",
    roomPrice: "",
    roomType: "",
    description: "",

  });

  const sendRoom = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('roomName', room.roomName);
    data.append('roomNumber', room.roomNumber);
    data.append('image', room.image);
    data.append('roomPrice', room.roomPrice);
    data.append('roomType', room.roomType);
    data.append('description', room.description);


    axios.post("http://localhost:8000/api/room/create", data).then(() => {

      alert("Room is added");

      if (data) {
        return history('/ViewAllAvailableRoom');
      }
    }).catch((err) => {
      alert("Please Fill All the Required Fields");
    })
  }
  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  }

  const handlePhoto = (e) => {
    setRoom({ ...room, image: e.target.files[0] });
  }

  return (
    <div>
      <h1 style={{ margin: "2%" }}>Add Room</h1>
      <hr></hr>
      <Container>
        <form className="formCard" border="dark" onSubmit={sendRoom} encType="multipart/form-data">
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Room Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="roomName"
                  placeholder="Room Name"
                  value={room.roomName} onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Number *</Form.Label>
                <Form.Control
                  name="roomNumber"
                  placeholder="Room Number"
                  type="number"
                  maxLength="10"
                  value={room.roomNumber} onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image *</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Image"
                  onChange={handlePhoto}
                  required
                  
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Price *</Form.Label>
                <Form.Control
                  name="roomPrice"
                  placeholder="Room Price"
                  type="number"
                  value={room.roomPrice} onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="secondary" size="lg" style={{ width: "70%", float: "right" }}>
                Reset
              </Button>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Room Type *</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={room.roomType} onChange={handleChange}
                  name="roomType"
                  required
                >
                  <option></option>
                  <option value="King room">King room</option>
                  <option value="Twin room">Twin room</option>
                 

                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  name="description"
                  placeholder="Description"
                  as="textarea"
                  rows={8}
                  value={room.description} onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{ width: "70%", float: "left", margin: "5px" }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </div>
  );
}
export default AddRoom;