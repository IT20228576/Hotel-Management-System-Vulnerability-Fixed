import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function AddReservation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [roomType, setRoomType] = useState("");
  const [room, setRoom] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const [roomInfo, setRoomInfo] = useState([]);
  const [roomTypeLOV, setRoomTypeLOV] = useState([]);
  const [roomLOV, setRoomLOV] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      firstName === "" &&
      lastName === "" &&
      mobile === "" &&
      email === "" &&
      roomType === "" &&
      room === "" &&
      checkinDate === "" &&
      checkinTime === "" &&
      checkoutDate === "" &&
      checkoutTime === "" &&
      adults === "" &&     
      paymentMethod === ""        
    ) {
      alert("Please Enter All the Mandatory Fields");
    } else if (mobile.length > 12 || mobile.length < 10) {
      alert("Please Enter a valid Phone Number");
    } else {
      let resObj = {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        roomType: roomType,
        room: room,
        checkinDate: checkinDate,
        checkinTime: checkinTime,
        checkoutDate: checkoutDate,
        checkoutTime: checkoutTime,
        adults: adults,
        children: children,
        numberOfRooms: numberOfRooms,
        amount: amount,
        paymentMethod: paymentMethod,
        note: note,
      };
      axios
        .post("http://localhost:8000/reservations/add", resObj)
        .then((response) => {
          if (response.status === 201) {
            alert(response.data.message);
            navigate("/reservations");
          } else if (response.status === 500) {
            alert("Reservation Validation Failed");
          }
        })
        .catch((error) => {
          alert(error.response.message);
        });
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/room/getAll")
      .then((res) => setRoomInfo(res.data))
      .catch((error) => alert("Couldn't Fetch Room Details"));
    getRoomTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRoomTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomInfo]);

  const getRoomTypes = () => {
    const types = [];
    for (let i = 0; i < roomInfo.length; i++) {
      if (types.indexOf(roomInfo[i].roomType) === -1) {
        types.push(roomInfo[i].roomType);
      }
    }
    setRoomTypeLOV(types);
  };

  const handleRoomTypeChange = (roomType) => {
    const rooms = [];
    for (let i = 0; i < roomInfo.length; i++) {
      if (roomInfo[i].roomType === roomType) {
        rooms.push(roomInfo[i].roomName);
      }
    }
    setRoomLOV(rooms);
  };

  const handleRoomPrice = (name, roomsNum) => {
    for (let i = 0; i < roomInfo.length; i++) {
      if (roomInfo[i].roomName === name) {
        let roomAmount =
          roomsNum === "" || roomsNum === 0
            ? roomInfo[i].roomPrice
            : roomInfo[i].roomPrice * roomsNum;
        setAmount(roomAmount);
      }
    }
  };

  const handleReset = async () => {
    setNumberOfRooms(0);
    setAmount(0);
  };

  const handleBack = () => {
    navigate("/reservations");
  };

  return (
    <div className="container">
      <div className="container-fluid p-3">
        <div>
          <Button className="btn btn-light ms-2" onClick={handleBack}>
            <ArrowBackIcon />
          </Button>
          <h1 style={{ margin: "2%" }}>Add Reservation</h1>
        </div>
        <hr />
        <Container>
          <form onSubmit={handleSubmit} onReset={handleReset} border="dark">
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    required
                    name="phoneNumber"
                    placeholder="Phone Number"
                    maxLength="10"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Room Type *</Form.Label>
                  <Form.Select
                    required
                    aria-label="Default select example"
                    onChange={(e) => {
                      setRoomType(e.target.value);
                      setRoom("");
                      handleRoomTypeChange(e.target.value);
                      setAmount(0);
                    }}
                  >
                    <option></option>;
                    {roomTypeLOV.map((item, index) => {
                      return <option key={index} value={item}>{item}</option>;
                    })}
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-in Date *</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        placeholder="Check-in Date"
                        onChange={(e) => setCheckinDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3">
                    <Form.Group className="mb-3">
                      <Form.Label>Check-in Time *</Form.Label>
                      <Form.Control
                        required
                        type="time"
                        placeholder="Check-in Time"
                        onChange={(e) => setCheckinTime(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Adults *</Form.Label>
                  <Form.Control
                    required
                    name="adults"
                    placeholder="Adults"
                    type="number"
                    min="1"
                    onChange={(e) => setAdults(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Children</Form.Label>
                  <Form.Control
                    name="children"
                    placeholder="Children"
                    type="number"
                    min="0"
                    onChange={(e) => setChildren(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Amount ($) *</Form.Label>
                  <Form.Control
                    required
                    name="amount"
                    placeholder="Amount"
                    value={amount}
                    readOnly
                    disabled
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    required
                    name="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Room Name *</Form.Label>
                  <Form.Select
                    required
                    aria-label="Default select example"
                    value={room}
                    onChange={(e) => {
                      if (e.target.value) {
                        setRoom(e.target.value);
                        handleRoomPrice(e.target.value, numberOfRooms);
                      } else {
                        setRoom("");
                        handleRoomPrice("", "");
                      }
                    }}
                  >
                    <option></option>;
                    {roomLOV.map((item, index) => {
                      return <option key={index} value={item}>{item}</option>;
                    })}
                  </Form.Select>
                </Form.Group>

                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-out Date *</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        placeholder="Check-out Date"
                        onChange={(e) => setCheckoutDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-out Time *</Form.Label>
                      <Form.Control
                        required
                        type="time"
                        placeholder="Check-out Time"
                        onChange={(e) => setCheckoutTime(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Rooms *</Form.Label>
                  <Form.Control
                    required
                    name="rooms"
                    placeholder="Rooms"
                    type="number"
                    min="1"
                    value={numberOfRooms}
                    onChange={(e) => {
                      // eslint-disable-next-line no-lone-blocks
                      {
                        setNumberOfRooms(e.target.value);
                        handleRoomPrice(room, e.target.value);
                      }
                    }}
                  />
                </Form.Group>

                <Row>
                  <Form.Label>Payment Method</Form.Label>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="radio"
                        label="Cash"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        value="Cash"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="radio"
                        label="Card"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        value="Card"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    name="note"
                    placeholder="Description"
                    as="textarea"
                    rows={5}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  variant="secondary"
                  size="lg"
                  type="reset"
                  style={{ width: "70%", float: "right", margin: "5px" }}
                >
                  Reset
                </Button>
              </Col>
              <Col>
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
    </div>
  );
}

export default AddReservation;
