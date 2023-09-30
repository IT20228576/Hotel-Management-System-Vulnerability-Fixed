import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Card, CardGroup } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
import PrintIcon from "@mui/icons-material/Print";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Logo from "../eventManagement/Images/Logo.png";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import * as XLSX from 'xlsx'

function ReservationReport() {
  const [details, setDetails] = useState([]);
  const componentRef = useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Reservations-Report",
  });

  const handleDownload = () => {
    var workBook = XLSX.utils.book_new();
    var workSheet = XLSX.utils.json_to_sheet(details);

    XLSX.utils.book_append_sheet(workBook, workSheet, "Sheet1");
    XLSX.writeFile(workBook, "Reservation.xlsx");
  };

  const handleBack = () => {
    navigate("/reservations");
  };

  async function getAllData() {
    try {
      await axios
        .get("http://localhost:8000/reservations/getAll")
        .then((res) => {
          if (res.status === 200) {
            setDetails(res.data.data);
          }
        });
    } catch (error) {
      alert(error);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  var dataList = details.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.referenceNumber}</td>
        <td>{item.firstName + " " + item.lastName}</td>
        <td>{item.mobile}</td>
        <td>{item.checkinDate.substring(0, 10)}</td>
        <td>{item.checkoutDate.substring(0, 10)}</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="mt-5 mb-2">
        <Button className="btn btn-light ms-2" onClick={handleBack}>
          <ArrowBackIcon />
        </Button>
        <span className="float-end">
          <Button
            className="btn btn-secondary ms-2 ml-auto"
            onClick={handlePrint}
          >
            <PrintIcon />
          </Button>
          {details && (
            <Button className="btn btn-success ms-2" onClick={handleDownload}>
              <FileDownloadIcon />
            </Button>
          )}
        </span>
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
                  <h4 style={{ color: "#ffdb4d" }}>Reservations Report</h4>
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
                        <b>Reference Number</b>
                      </th>
                      <th scope="col">
                        <b>Name</b>
                      </th>
                      <th scope="col">
                        <b>Phone Number</b>
                      </th>
                      <th scope="col">
                        <b>Check-in</b>
                      </th>
                      <th scope="col">
                        <b>Check-out</b>
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

export default ReservationReport;
