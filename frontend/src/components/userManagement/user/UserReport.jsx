import { useMemo, useRef, useState } from "react";
import axios from "axios";
import Select from "react-select";
import countryList from "react-select-country-list";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import img5 from "../../eventManagement/Images/Logo.png";
import { useDownloadExcel } from "react-export-table-to-excel";
import jsPDF from "jspdf";
import "jspdf-autotable";

const UserReport = () => {
  const [joinedFrom, setJoinedFrom] = useState("");
  const [joinedTo, setJoinedTo] = useState("");
  const [userType, setUserType] = useState("All");
  const [tempCountry, setTempCountry] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const tableRef = useRef(null);

  const options = useMemo(() => countryList().getData(), []);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Users table",
    sheet: "Users",
  });

  const exportPDF = async () => {
    try {
      if (users.length === 0) {
        alert("No data to export");
        return;
      }
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape

      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);

      doc.setFontSize(15);

      const title = "User Report";
      const headers = [
        [
          "First Name",
          "Last Name",
          "Email",
          "Mobile",
          "DOB",
          "Country",
          "User Type",
        ],
      ];

      const data = users?.map((elt) => [
        elt.firstName,
        elt.lastName,
        elt.email,
        elt.mobile,
        elt?.dob?.toString()?.substring(0, 10),
        elt.country,
        elt.userType,
      ]);

      let content = {
        head: headers,
        body: data,
      };

      const filterHeaders = [
        ["Joined From", "Joined To", "User Type", "Country"],
      ];

      const filterData = [
        [
          joinedFrom?.toString()?.substring(0, 10),
          joinedTo?.toString()?.substring(0, 10),
          userType,
          country,
        ],
      ];

      let filter = {
        startY: 50,
        head: filterHeaders,
        body: filterData,
      };

      doc.text(title, marginLeft, 40);
      doc.autoTable(filter);
      doc.autoTable(content);
      doc.save("report.pdf");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * When the user clicks the submit button, prevent the default action, then send a Put request to the
   * server with the user's details, and if successful, navigate to the home page.
   */
  const userReport = async (e) => {
    e.preventDefault();
    try {
      /* Setting the loading state to true. */
      setLoading(true);

      /* Creating an object with the same name as the variables. */
      const FilterData = {
        joinedFrom,
        joinedTo,
        userType,
        country,
      };

      /* Sending a post request to the server with the user's details. */
      const result = await axios.post(
        "http://localhost:8000/user/report",
        FilterData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 200) {
        setUsers(result?.data?.users);
        setLoading(false);
        //onDownload();
        // exportPDF(result?.data?.users);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  /**
   * When the user clicks the reset button, clear all the form fields.
   */
  const resetForm = (e) => {
    window.location.reload();
    setJoinedFrom("");
    setJoinedTo("");
    setUserType("All");
    setCountry("");
    setLoading(false);
  };

  /**
   * When the user selects a country, set the country to the value of the selected country and set the
   * temporary country to the selected country.
   */
  const countryHandler = (e) => {
    setCountry(e.value);
    setTempCountry(e);
  };

  return (
    <div className="main">
      <div className="sub-main">
        <h1>User Report Generate</h1>
        <hr />
        <form onSubmit={userReport} border="dark">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Joined From</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date Of Birth"
                    onChange={(e) => setJoinedFrom(e.target.value)}
                    value={joinedFrom}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Joined To</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date Of Birth"
                    onChange={(e) => setJoinedTo(e.target.value)}
                    value={joinedTo}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>User Type</Form.Label>
                  <div className="form-radio-space">
                    <span
                      onChange={(e) => setUserType(e.target.value)}
                      value={userType}
                    >
                      <span className="form-radio">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="All"
                          name="userType"
                          defaultChecked
                        />
                        All
                      </span>
                      <span className="form-radio">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Admin"
                          name="userType"
                        />
                        Admins
                      </span>
                      <span className="form-radio">
                        <input
                          className="form-check-input"
                          type="radio"
                          value="Customer"
                          name="userType"
                        />
                        Customers
                      </span>
                    </span>
                  </div>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Select
                    options={options}
                    value={tempCountry}
                    onChange={countryHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Button
                  onClick={resetForm}
                  variant="secondary"
                  size="lg"
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
                  style={{ width: "30%", margin: "5px" }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Searching...</span>
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={exportPDF}
                  style={{ width: "30%", margin: "5px" }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Printing...</span>
                    </>
                  ) : (
                    "PDF"
                  )}
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={onDownload}
                  style={{ width: "30%", margin: "5px" }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Printing...</span>
                    </>
                  ) : (
                    "Excel"
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </form>
      </div>

      <div className="report-table">
        <div
          style={{
            marginTop: "15px",
            marginBottom: "-56px",
            marginLeft: "70px",
          }}
        ></div>
        <br></br>
        <div style={{ marginLeft: "200px" }}></div>
        <br></br>
        <div style={{ width: "100%", height: window.innerHeight }}>
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
                    ref={tableRef}
                  >
                    <thead>
                      <tr style={{ background: "#b38600", color: "#ffffe6" }}>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Date Of Birth</th>
                        <th scope="col">Country</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Verified</th>
                        <th scope="col">Admin Created</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Last Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((current, id) => {
                        return (
                          <>
                            <tr key={id}>
                              <td>{current._id}</td>
                              <td>{current.firstName}</td>
                              <td>{current.lastName}</td>
                              <td>{current.email}</td>
                              <td>{current.mobile}</td>
                              <td>
                                {current?.dob?.toString()?.substring(0, 10)}
                              </td>
                              <td>{current.country}</td>
                              <td>{current.userType}</td>

                              {current?.verified === true ? (
                                <td>Verified</td>
                              ) : (
                                <td>Not Verified</td>
                              )}

                              <td>
                                {current?.adminCreated === true ? (
                                  <td>Yes</td>
                                ) : (
                                  <td>No</td>
                                )}
                              </td>
                              <td>{current.createdAt}</td>
                              <td>{current.updatedAt}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      </div>
    </div>
  );
};

export default UserReport;
