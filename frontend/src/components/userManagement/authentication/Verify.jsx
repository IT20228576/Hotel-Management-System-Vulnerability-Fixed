import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Verify() {
  const [isVerify, setIsVerify] = useState("");
  /* A hook that is used to get the parameters from the url. */
  const param = useParams();

  const navigate = useNavigate();

  /* Calling the function verifyUrl() when the component is mounted. */
  useEffect(() => {
    verifyUrl();
    /**
     * It takes the id and token from the url and sends a get request to the server to verify the user.
     */
    async function verifyUrl() {
      try {
        const url = `http://localhost:8000/verify/${param.id}/${param.token}`;
        await axios.get(url);
          
        setIsVerify(true);
        window.alert("Successfully Verified!");
        navigate("/");
      } catch (err) {
        setIsVerify(false);
        console.error(err);
      }
    }
  }, [navigate, param.id, param.token]);

  return (
    <div>
      {isVerify === "" ? <h1>Loading...</h1> : ""}
      {isVerify === true ? <h1>Successfully Verified!</h1> : ""}
      {isVerify === false ? <h1>404 Not Found!</h1> : ""}
    </div>
  );
}

export default Verify;
