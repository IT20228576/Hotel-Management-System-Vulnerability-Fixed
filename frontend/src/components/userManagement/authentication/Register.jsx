import { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [tempCountry, setTempCountry] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [loading, setLoading] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

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
      const RegisterData = {
        firstName,
        lastName,
        email,
        dob,
        mobile,
        country,
        password,
        passwordVerify,
      };

      /* Sending a post request to the server with the user's details. */
      const result = await axios.post(
        "http://localhost:8000/user/register",
        RegisterData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 201) {
        setLoading(false);
        alert("Verification Email Sent successfully");
        /* Removing the type and status from local storage. */
        localStorage.removeItem("type");
        /* Reloading the page. */
        navigate("/");
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
    setCountry("");
    setPassword("");
    setPasswordVerify("");
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
        <h1>Register</h1>
        <hr />
        <form onSubmit={register} border="dark">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
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
                  <Form.Label>Last Name</Form.Label>
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
                  <Form.Label>E-mail</Form.Label>
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
                    required
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
                    required
                    onChange={(e) => setDob(e.target.value)}
                    value={dob}
                  />
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
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Password Verify</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password Verify"
                    required
                    onChange={(e) => setPasswordVerify(e.target.value)}
                    value={passwordVerify}
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
                      <span className="sr-only">Registering...</span>
                    </>
                  ) : (
                    "Register"
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

export default Register;
