import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../userManagement/context/UserContext";

const RoomDetailsView = () => {

  const navigate = useNavigate();

  const [details, setDetails] = useState([]);

  const mystyle = {
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
    border: "solid",
    padding: "3rem"
  };

  const { id } = useParams();
  const { userType } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/select-room/${id}`)
      .then(function (response) {
        setDetails(response.data.details);
      })
      .catch(function (error) {
        alert(error);
      });
  }, []);


  return (
    <Container>
      <h2 style={{ marginTop: "2rem", marginBottom: "3rem" }}>Rooms</h2>
      <div style={{ display: "flex", justifyContent: "center", maginTop: "2rem" }}>
        <div style={mystyle}>
          <div style={{ width: "45rem" }}>
            <div> <p>Room Name: {details.roomName}</p></div>
            <div> <p>Room Type: {details.roomType}</p></div>
            <div> <p>Room Price: {details.roomPrice}</p></div>
            <div> <p>Description: {details.description}</p></div>
          </div>

          <div><img src={typeof (details.image) !== 'undefined' ? require(`../image/${details.image}`) : 'Error'} style={{ width: "30rem" }} alt="single-room" /></div>

        </div>
      </div>
      <div style={{ display: "flex", gap: "5rem", height: "4rem", width: "100%", justifyContent: "center", marginTop: "3rem" }}>
        <Button style={{ width: "10rem" }} onClick={() => navigate(-1)}>Back</Button>
        {userType === "Customer" ? (<Button style={{ width: "10rem" }} onClick={() => navigate("/reserve", { state: details })}>Reserve</Button>) : ("")}
      </div>

    </Container>
  )
}

export default RoomDetailsView