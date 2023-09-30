/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PrintIcon from "@mui/icons-material/Print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import Logo from "../eventManagement/Images/Logo.png";

function ConfirmReserve() {
  const { state } = useLocation();
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [mobile, setMobile] = useState(state.mobile);
  const [email, setEmail] = useState(state.email);
  const [roomType, setRoomType] = useState(state.roomType);
  const [room, setRoom] = useState(state.room);
  const [checkinDate, setCheckinDate] = useState(state.checkinDate);
  const [checkinTime, setCheckinTime] = useState(
    moment(state.checkinTime, "hh:mm a").format("hh:mm a")
  );
  const [checkoutDate, setCheckoutDate] = useState(state.checkoutDate);
  const [checkoutTime, setCheckoutTime] = useState(
    moment(state.checkoutTime, "hh:mm a").format("hh:mm a")
  );
  const [adults, setAdults] = useState(state.adults);
  const [children, setChildren] = useState(state.children);
  const [numberOfRooms, setNumberOfRooms] = useState(state.numberOfRooms);
  const [amount, setAmount] = useState(state.amount);
  const [paymentMethod, setPaymentMethod] = useState(state.paymentMethod);
  const [note, setNote] = useState(state.note);
  const [totalAmount, setTotalAmount] = useState(0);
  const [refNumber, setRefNumber] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const componentRef = useRef();
  const tax = 5;
  const taxAmount = amount * (tax / 100);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Reservation-Confirmation-Report",
  });

  const handleConfirm = async () => {
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
      amount: totalAmount,
      paymentMethod: paymentMethod,
      note: note,
    };

    await axios
      .post("http://localhost:8000/reservations/confirm", resObj)
      .then((response) => {
        if (response.status === 201) {
          alert(response.data.message);
          setRefNumber(response.data.data.referenceNumber);
          setIsConfirmed(true);
          localStorage.setItem("confirmStatus", response.data.confirmation);
          localStorage.setItem("refNumber", response.data.data.referenceNumber);
        } else if (response.status === 500) {
          alert("Sorry! Couldn't Confirm the Reservation.");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(() => {
    if (
      window.performance.getEntriesByType("navigation")[0].type !== "reload"
    ) {
      localStorage.removeItem("confirmStatus");
      localStorage.removeItem("refNumber");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (localStorage.getItem("confirmStatus") === "Confirmed") {
      setIsConfirmed(true);
      setRefNumber(localStorage.getItem("refNumber"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTotalAmount(amount + taxAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taxAmount]);

  return (
    <div className="container">
      <Container className="d-flex justify-content-center mt-4">
        <Row
          style={{
            marginLeft: "auto",
            height: "20px",
            width: "50px",
          }}
        >
          {isConfirmed ? (
            <Button variant="secondary" size="lg" onClick={handlePrint}>
              <PrintIcon />
            </Button>
          ) : (
            ""
          )}
        </Row>
      </Container>
      <Container
        className="d-flex justify-content-center mt-5"
        ref={componentRef}
      >
        <Card style={{ width: "100rem" }}>
          <Card.Body>
            <Row>
              <Card.Title style={{ textAlign: "center" }}>
                <div style={{ float: "left", width: "25%" }}>
                  <img
                    src={Logo}
                    alt="First slide"
                    style={{
                      width: "200px",
                      height: "200px",
                      marginTop: "10px",
                    }}
                  ></img>
                </div>

                <div style={{ float: "left", width: "50%" }}>
                  <h1
                    style={{
                      marginTop: "10px",
                      textAlign: "center",
                      color: "#b38600",
                    }}
                  >
                    <b>CISP HOTEL</b>
                  </h1>
                  <h4 style={{ color: "#ffdb4d" }}>Reservation Confirmation</h4>
                </div>

                <div style={{ float: "left", width: "25%" }}>
                  <img
                    src={Logo}
                    alt="First slide"
                    style={{
                      width: "200px",
                      height: "200px",
                      marginTop: "10px",
                    }}
                  ></img>
                </div>
                <br></br>
              </Card.Title>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Card.Subtitle as="h5" className="mt-2">
                    Personal Info
                  </Card.Subtitle>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      Full Name: {firstName} {lastName}
                    </ListGroup.Item>
                    <ListGroup.Item>Phone Number: {mobile}</ListGroup.Item>
                    <ListGroup.Item>
                      Email: <Link to="/#">{email}</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
                <Row>
                  <Card.Subtitle as="h5" className="mt-3">
                    Dates
                  </Card.Subtitle>
                  <ListGroup className="list-group-flush border">
                    <ListGroup.Item style={{ fontSize: "16px" }}>
                      <b>Check-in:</b> {checkinDate} {checkinTime}
                      <KeyboardArrowRightIcon />
                      <b>Check-out:</b> {checkoutDate} {checkoutTime}
                    </ListGroup.Item>
                  </ListGroup>
                </Row>
              </Col>
              <Col>
                <Card.Subtitle
                  as="h5"
                  className="d-flex justify-content-between mt-2"
                >
                  Summary
                  <span style={{ color: "#00B5E2" }}>
                    {isConfirmed ? "#" + refNumber : ""}
                  </span>
                </Card.Subtitle>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>Price</th>
                      <td>$ {amount}</td>
                    </tr>
                    <tr>
                      <th>Room</th>
                      <td>{room}</td>
                    </tr>
                    <tr>
                      <th>Number of Rooms</th>
                      <td>{numberOfRooms}</td>
                    </tr>
                    <tr>
                      <th>Tax {tax}%</th>
                      <td>$ {taxAmount}</td>
                    </tr>
                    <tr>
                      <th>Total Price</th>
                      <td>$ {totalAmount}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      {isConfirmed ? (
        ""
      ) : (
        <Row className="mt-5 mb-5">
          <Col className="d-inline-flex gap-5 justify-content-center">
            <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="primary" size="lg" onClick={handleConfirm}>
              Confirm
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ConfirmReserve;
