import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a POST request to the
   * server with the user's email and password, and if successful, navigate to the home page.
   */
  const login = async (e) => {
    e.preventDefault();
    try {
      /* Setting the loading state to true. */
      setLoading(true);

      /* Creating an object with the email and password. */
      const loginData = {
        email,
        password,
      };

      /* Sending a POST request to the server with the user's email and password. */
      const result = await axios.post("http://localhost:8000/login", loginData);

      /* Checking if the status is true. */
      if (result) {
        setLoading(false);
        localStorage.setItem("type", result?.data?.type);
        if ( result?.data?.verified === false) {
          /* Setting the local storage with the type and status. */
          /* Reloading the page. */
          alert("Please Update Your Profile");
          navigate("/profile");
          window.location.reload();
        } else {
          /* Setting the local storage with the type and status. */
          /* Reloading the page. */
          navigate("/");
          window.location.reload();
        }
      }
    } catch (err) {
      setLoading(false);
      alert(err.response.data.errorMessage);
      console.error(err.response.data.errorMessage);
    }
  };

  async function forgotPassword() {
    try {
      let email = window.prompt("Please Enter Your Email Address")
      if (email === null) {
        return
      } else {
        console.log("Please Enter Your Email Address", email);
        const result = await axios.post("http://localhost:8000/forgot-password", {email});
        if (result?.status === 201) {
          alert("Check Your Email For New Password")
        }
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.errorMessage);
    }
  }

  return (
    <div className="main">
      <div className="sub-main">
        <div className="main-center">
          <h1 style={{ margin: "2%" }}>Login</h1>
        </div>
        <hr />
        <form border="dark" onSubmit={login}>
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
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
            </Row>
          </Container>
          <div className="main-center">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              style={{ width: "40%", float: "center", margin: "5px" }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Login...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
        <hr />
        <div className="main-center">
          <button className="forgot-button" onClick={forgotPassword}>
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
