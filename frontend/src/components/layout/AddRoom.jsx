import React, { useState } from "react";

import {
  Col,
  Row,
  Button,
  Form,
  Container,
} from "react-bootstrap";


import axios from "axios";

function AddRoom() {
  function handleChange(event) {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  }

  const [room, setRoom] = useState({
    roomName: "",
    roomNumber: "",
    imageURL: "",
    roomPrice: "",
    roomType: "",
    description: "",
  });

  async function hadleSubmit(e) {
    
    e.preventDefault();
    console.log(room);
    axios
      .post("http://localhost:8000/api/room/create", room)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  return (
    <div>
      <h1 style={{margin:"2%" }}>Add Room</h1>
      <hr></hr>
      <Container>
        <form className="formCard" border="dark" onSubmit={hadleSubmit}>
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Room Name</Form.Label>
                <Form.Control
                  name="roomName"
                  placeholder="Room Name"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Number</Form.Label>
                <Form.Control
                  name="roomNumber"
                  placeholder="Room Number"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Image"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Price</Form.Label>
                <Form.Control
                  name="roomPrice"
                  placeholder="Room Price"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="secondary" size="lg" style={{ width: "70%", float: "right" }}>
                Reset
              </Button>
            </Col>

            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Room Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                >
                  <option>Room Type</option>
                  <option value="King room">King room</option>
                  <option value="Twin room">Twin room</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  placeholder="Description"
                  as="textarea"
                  rows={8}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                size="lg"
                type="submit"
                style={{ width: "70%", float:"left", margin:"5px"}}
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