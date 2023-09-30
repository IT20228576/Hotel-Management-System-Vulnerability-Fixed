import React, { useState, useEffect } from "react";

import {
  Col,
  Row,
  Button,
  Form,
  Container,
} from "react-bootstrap";



import axios from "axios";

function UpdateRoom(_props) {

  const [roomToUpdate, setRoomToUpdate] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/room/getOne/" + localStorage.getItem("updateid"))
      .then((res) => setRoomToUpdate(res.data))

      .catch((err) => { alert(err) });
  }, []);

  const [room, setRoom] = useState({
    roomName: "",
    roomNumber: "",
    imageURL: "",
    roomPrice: "",
    roomType: "",
    description: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  }



  async function handleEdit(e) {
    e.preventDefault();

    const data = new FormData();

    data.append("file", image);
    data.append("upload_preset", "roommangment");
    data.append("cloud_name", "dottqi9rk");



    fetch("https://api.cloudinary.com/v1_1/dottqi9rk/image/upload/", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTimeout(() => {

          setRoom((room.imageURL = data.url));


          axios
            .put(
              "http://localhost:8000/api/room/update/" + localStorage.getItem("updateid"),
              room
            )
            .then(function (_response) {
              alert("updated successfully");
              window.location.reload();
            })
            .catch(function (error) {
              alert(error.response);
            });
        }, 2000);
      })
      .catch((err) => { alert(err) });
  }


  return (
    <div>

      <Container>
        <form className="formCard" border="dark" onSubmit={handleEdit} style={{ margin: "2%" }}>
          <Row className="justify-content-md-center">
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Room Name *</Form.Label>
                <Form.Control
                  name="roomName"
                  placeholder="Room Name"
                  type="text"
                  defaultValue={roomToUpdate.roomName}
                  onChange={handleChange}
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
                  defaultValue={roomToUpdate.roomNumber}
                  onChange={handleChange}
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
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Room Price *</Form.Label>
                <Form.Control
                  name="roomPrice"
                  placeholder="Room Price"
                  defaultValue={roomToUpdate.roomPrice}
                  onChange={handleChange}
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
                  defaultValue={roomToUpdate.roomType}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  defaultValue={roomToUpdate.description}
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
export default UpdateRoom;
