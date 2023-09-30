import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const ChangePassword = () => {
  const { state } = useLocation();

  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordVerify, setNewPasswordVerify] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a Put request to the
   * server with the user's details, and if successful, navigate to the home page.
   */
  const changePassword = async (e) => {
    e.preventDefault();
    try {
      /* Setting the loading state to true. */
      setLoading(true);

      /* Creating an object with the same name as the variables. */
      const passwordData = {
        password,
        passwordVerify,
        newPassword,
        newPasswordVerify,
      };

      /* Sending a post request to the server with the user's details. */
      const result = await axios.put(
        "http://localhost:8000/user/changepassword",
        passwordData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 201) {
        setLoading(false);
        alert("Password changed successfully");
        /* Reloading the page. */
        navigate("/login");
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
    setPassword("");
    setPasswordVerify("");
    setNewPassword("");
    setNewPasswordVerify("");
  };

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Change Password</h1>
        <hr />
        <Form.Label>E-mail </Form.Label>
        <Form.Label className="mx-5">{state.email}</Form.Label>
        <hr />
        <form onSubmit={changePassword} border="dark">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Current Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Current Password"
                    required
                    onChange={(e) => setPasswordVerify(e.target.value)}
                    value={passwordVerify}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm New Password"
                    required
                    onChange={(e) => setNewPasswordVerify(e.target.value)}
                    value={newPasswordVerify}
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
                      <span className="sr-only">Changing...</span>
                    </>
                  ) : (
                    "Change Password"
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

export default ChangePassword;
