import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Card, CardGroup } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../eventManagement/Images/Logo.png";

function RoomReport() {
  const [rooms, setRooms] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Reservations-Report",
  });

  const handleBack = () => {
    navigate("/viewRooms");
  };

  async function getAllData() {
    try {
      await axios.get("http://localhost:8000/api/room/get").then((res) => {
        if (res.status === 200) {
          setRooms(res.data.data);
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  var dataList = rooms.map((room, index) => {
    return (
      <tr key={index}>
        <td>{room._id}</td>
        <td>{room.roomName}</td>
        <td>{room.roomType}</td>
        <td>{room.roomPrice}</td>
        <td>{room.roomNumber}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="mt-5 mb-2">
        <Button className="btn btn-light ms-2" onClick={handleBack}>
          <ArrowBackIcon />
        </Button>
        <Button className="btn btn-secondary ms-2" onClick={handlePrint}>
          <PrintIcon />
        </Button>
      </div>
      <div
        ref={componentRef}
        style={{ width: "100%", height: window.innerHeight }}
      >
        <CardGroup>
          <Card>
            <Card.Body>
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
                  <h4 style={{ color: "#ffdb4d" }}>Room Report</h4>
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

              <div className="container-fluid mt-3">
                <table
                  className="table table-hover"
                  style={{ textAlign: "center", background: "#ffdb4d" }}
                >
                  <thead style={{ background: "#b38600", color: "#ffffe6" }}>
                    <tr>
                      <th scope="col">
                        <b>Room ID</b>
                      </th>
                      <th scope="col">
                        <b>Room Name</b>
                      </th>
                      <th scope="col">
                        <b>Room Type</b>
                      </th>
                      <th scope="col">
                        <b>Room Price</b>
                      </th>
                      <th scope="col">
                        <b>Room Number</b>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{dataList}</tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
}

export default RoomReport;
