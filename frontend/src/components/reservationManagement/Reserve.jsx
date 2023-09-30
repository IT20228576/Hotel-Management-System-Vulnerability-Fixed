import React, { useEffect, useState } from "react";
import { Col, Row, Button, Form, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationModel from "./layout/NotificationModel";

function Reserve() {
  const [userInfo, setUserInfo] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [checkinDate, setCheckinDate] = useState("");
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");
  const [adults, setAdults] = useState("");
  const [children, setChildren] = useState("");
  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      firstName === "" &&
      lastName === "" &&
      mobile === "" &&
      email === "" &&
      checkinDate === "" &&
      checkinTime === "" &&
      checkoutDate === "" &&
      checkoutTime === "" &&
      adults === "" &&
      paymentMethod === ""
    ) {
      alert("Please Enter All the Mandatory Fields");
    } else {
      let resObj = {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
        email: email,
        roomType: state.roomType,
        room: state.roomName,
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
      navigate("/reserve/confirm", { state: resObj });
    }
  }

  // getting the current user's information by calling the API implemented by IT20228576
  async function getUserInfo() {
    try {
      const result = await axios.get("http://localhost:8000/user/profile");
      setUserInfo(result.data);
    } catch (err) {
      alert(err.message);
    }
  }

  // getting user info when the component is rendered.
  useEffect(() => {
    getUserInfo();
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setMobile(userInfo.mobile);
      setEmail(userInfo.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setMobile(userInfo.mobile);
      setEmail(userInfo.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (checkinDate !== "" && checkoutDate !== "") {
      checkAvailability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkinDate, checkoutDate]);

  const handleRoomPrice = (roomPrice, roomsNum) => {
    const finalAmount = roomPrice * (roomsNum ? roomsNum : 1);
    setAmount(finalAmount);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const checkAvailability = async () => {
    const room = state.roomName;
    const checkin = checkinDate;
    const checkout = checkoutDate;

    const resultData = await axios.get(
      `http://localhost:8000/reservations/checkAvailability/${room}/${checkin}/${checkout}`
    );

    if (resultData) {
      setMessage(resultData.data.message);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="container">
      <div className="container-fluid p-3">
        <div>
          <Button className="btn btn-light ms-2" onClick={handleBack}>
            <ArrowBackIcon />
          </Button>
          <h1 style={{ margin: "2%" }}>{state.roomName}</h1>
        </div>
        <h5>
          <i style={{ margin: "2%" }}>
            Your reservation will be verified prior to your arrival.
          </i>
        </h5>
        <hr />
        <Container>
          <form onSubmit={handleSubmit} border="dark">
            <Row className="justify-content-md-center">
              <Col>
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
                  <Col>
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

                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Number of Adults *</Form.Label>
                    <Form.Control
                      required
                      name="adults"
                      placeholder="Adults"
                      type="number"
                      min="1"
                      onChange={(e) => setAdults(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Number of Rooms *</Form.Label>
                    <Form.Control
                      required
                      name="rooms"
                      placeholder="Rooms"
                      type="number"
                      min="1"
                      onChange={(e) => {
                        // eslint-disable-next-line no-lone-blocks
                        {
                          setNumberOfRooms(e.target.value);
                          handleRoomPrice(state.roomPrice, e.target.value);
                        }
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Label>Payment Method</Form.Label>
                  <Col>
                    <Form.Group className="m-3">
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
                    <Form.Group className="m-3">
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
              </Col>

              <Col>
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

                <Row>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Number of Children (If there are any)
                    </Form.Label>
                    <Form.Control
                      name="children"
                      placeholder="Children"
                      type="number"
                      min="0"
                      onChange={(e) => setChildren(e.target.value)}
                    />
                  </Form.Group>
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
                  style={{ width: "70%", float: "right", margin: "5px" }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </form>
        </Container>
      </div>
      {modalOpen === true ? (
        <NotificationModel
          handleModalClose={handleModalClose}
          message={message}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Reserve;
