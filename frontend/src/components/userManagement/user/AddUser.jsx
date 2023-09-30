import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [tempUserType, setTempUserType] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);

  const options = [
    { value: "Admin", label: "Admin" },
    { value: "Customer", label: "Customer" },
  ];

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a Put request to the
   * server with the user's details, and if successful, navigate to the home page.
   */
  const register = async (e) => {
    e.preventDefault();
    try {
      /* Setting the loading state to true. */
      setLoading(true);

      /* Creating an object with the same name as the variables. */
      const UserData = {
        firstName,
        lastName,
        email,
        dob,
        mobile,
        userType,
      };

      /* Sending a post request to the server with the user's details. */
      const result = await axios.post(
        "http://localhost:8000/user/create-user",
        UserData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 201) {
        setLoading(false);
        alert(result?.data?.Message);
        /* Reloading the page. */
        navigate("/users/add");
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  /**
   * When the user clicks the reset button, clear all the form fields.
   */
  const resetForm = (e) => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDob("");
    setMobile("");
    setTempUserType("");
  };

  /**
   * When the user selects a country, set the country to the value of the selected country and set the
   * temporary country to the selected country.
   */
  const userTypeHandler = (e) => {
    setUserType(e.value);
    setTempUserType(e);
  };

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Add User</h1>
        <hr />
        <form onSubmit={register} border="dark">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>E-mail*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    maxLength="10"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Date Of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date Of Birth"
                    onChange={(e) => setDob(e.target.value)}
                    value={dob}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>User Type*</Form.Label>
                  <Select
                    options={options}
                    value={tempUserType}
                    onChange={userTypeHandler}
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
                  style={{ width: "70%", margin: "5px" }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Adding...</span>
                    </>
                  ) : (
                    "Add User"
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
