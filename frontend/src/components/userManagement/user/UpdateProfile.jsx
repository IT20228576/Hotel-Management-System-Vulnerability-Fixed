import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const UpdateProfile = () => {
  const { state } = useLocation();

  const [firstName, setFirstName] = useState(state?.firstName);
  const [lastName, setLastName] = useState(state?.lastName);
  const [email, setEmail] = useState(state?.email);
  const [dob, setDob] = useState(state?.dob);
  const [mobile, setMobile] = useState(state?.mobile);
  const [tempCountry, setTempCountry] = useState("");

  const [country, setCountry] = useState();
  const [loading, setLoading] = useState(false);

  const options = useMemo(() => countryList().getData(), []);

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a Put request to the
   * server with the user's details, and if successful, navigate to the home page.
   */
  const update = async (e) => {
    e.preventDefault();
    try {
      /* Setting the loading state to true. */
      setLoading(true);

      /* Creating an object with the same name as the variables. */
      const updateData = {
        firstName,
        lastName,
        dob,
        mobile,
        country,
      };

      /* Sending a post request to the server with the user's details. */
      const result = await axios.put(
        "http://localhost:8000/user/update",
        updateData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 201) {
        setLoading(false);
        alert(result?.data?.Message);
        /* Reloading the page. */
        navigate("/profile");
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      alert(err?.response?.data?.errorMessage);
      console.error(err?.response?.data?.errorMessage);
    }
  };

  /**
   * When the user clicks the reset button, clear all the form fields.
   */
  const resetForm = () => {
    setFirstName(state.firstName);
    setLastName(state.lastName);
    setDob(state.dob);
    setMobile(state.mobile);
    setTempCountry({
      label: countryList().getLabel(state?.country),
    });
  };

  /**
   * When the user selects a country, set the country to the value of the selected country and set the
   * temporary country to the selected country.
   */
  const countryHandler = (e) => {
    setCountry(e.value);
    setTempCountry(e);
  };

  useEffect(() => {
    if (state?.country !== undefined) {
      setTempCountry({
        label: countryList().getLabel(state?.country),
      });
      setCountry(state?.country);
    }
  }, [state]);

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Update</h1>
        <hr />
        <form onSubmit={update} border="dark">
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
                    disabled
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
                      <span className="sr-only">Updating...</span>
                    </>
                  ) : (
                    "Update"
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

export default UpdateProfile;
