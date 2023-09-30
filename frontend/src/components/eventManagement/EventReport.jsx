import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import img5 from "../eventManagement/Images/Logo.png";
import { Button } from "react-bootstrap";
import PrintIcon from "@mui/icons-material/Print";

const EventReport = () => {
  const componentRef = useRef();

  const [geteventdata, setEventdata] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const getdata = async () => {
    const res = await fetch("http://localhost:8000/event/view", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setEventdata(data.geteventdata);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "eventreport",
  });

  return (
    <div style={{ marginLeft: "100px" }}>
      <div
        style={{ marginTop: "15px", marginBottom: "-56px", marginLeft: "70px" }}
      >
        <Button className="btn btn-secondary ms-2" onClick={handlePrint}>
          <PrintIcon />
        </Button>
      </div>
      <br></br>
      <div style={{ marginLeft: "200px" }}>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            style={{ width: "700px", marginLeft: "300px" }}
            placeholder="Event Date"
            type="search"
            name="searchQuery"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          ></input>
        </form>
      </div>
      <br></br>
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
                    src={img5}
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
                    <i>CISP HOTEL</i>
                  </h1>
                  <h4 style={{ color: "#ffdb4d" }}>Events Report</h4>
                </div>

                <div style={{ float: "left", width: "25%" }}>
                  <img
                    src={img5}
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

              <div className="container">
                <table
                  className="table table-hover"
                  style={{ textAlign: "center", background: "#ffdb4d" }}
                >
                  <thead>
                    <tr style={{ background: "#b38600", color: "#ffffe6" }}>
                      <th scope="col">Event ID</th>
                      <th scope="col">Event Name</th>
                      <th scope="col">Event Type</th>
                      <th scope="col">Event Date</th>
                      <th scope="col">Client Name</th>
                      <th scope="col">Event Time</th>
                      <th scope="col">No Of Participants</th>
                      <th scope="col">Event Status</th>
                      <th scope="col">Event Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geteventdata.length > 0 ? geteventdata.filter((element) => {
                      if (searchTerm === "") {
                        return element;
                      } else if (
                        element.EventDate.toLowerCase().includes(
                          searchTerm.toLowerCase()
                        )
                      ) {
                        return element;
                      } else {

                        return false;
                      }
                    })
                      .map((element, id) => {
                        return (
                          <>
                            <tr>
                              <td>E{id + 100 + 1}</td>
                              <td>{element.EventName}</td>
                              <td>{element.EventType}</td>
                              <td>{element.EventDate}</td>
                              <td>{element.ClientName}</td>
                              <td>
                                {element.EventStartTime} -{" "}
                                {element.EventEndTime}
                              </td>
                              <td>{element.NoOfParticipants}</td>
                              <td>{element.EventStatus}</td>
                              <td>{element.EventLocation}</td>
                            </tr>
                          </>
                        );
                      }) : (
                      <div
                        className="notify"
                        style={{
                          position: "relative",
                          left: "60%",
                          right: "40%",
                          top: "30%",
                          bottom: "50%",
                          fontSize: "40px",
                          fontWeight: "bold",
                        }}>
                        No Result Found
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </div>
  );
};

export default EventReport;
