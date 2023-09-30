import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import "../layout/Styles/PopUpStyles.css";
import { Button } from "react-bootstrap";


const EventForCustomer = () => {

    const [geteventdata, setEventdata] = useState([]);
    

    const { id } = useParams("");
  

    const getdata = async () => {
        const res = await fetch(`http://localhost:8000/event/vew/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
       

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setEventdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container mt-3" style={{ height: "650px" }}>
            <h1 style={{ textAlign: "center" }}><b>{geteventdata.EventName}</b></h1><br></br>
            <div style={{ float: "left", width: "200px", marginLeft: "100px" }}>
                <p><b>Event ID</b></p>
                <p><b>Event Type</b></p>
                <p><b>Event Date</b></p>
                <p><b>Client Name</b></p>
                <p><b>Event Start Time</b></p>
                <p><b>Event End Time</b></p>
                <p><b>No Of Participants</b></p>
                <p><b>Event Status</b></p>
                <p><b>Event Location</b></p>
                <p><b>Event Description</b></p>
            </div>

            <div style={{ float: "left", width: "400px" }}>
                <p>{geteventdata.EventName}</p>
                <p>{geteventdata.EventType}</p>
                <p>{geteventdata.EventDate}</p>
                <p>{geteventdata.ClientName}</p>
                <p>{geteventdata.EventStartTime}</p>
                <p>{geteventdata.EventEndTime}</p>
                <p>{geteventdata.NoOfParticipants}</p>
                <p>{geteventdata.EventStatus}</p>
                <p>{geteventdata.EventLocation}</p>
                <p>{geteventdata.EventDescription}</p>
                <NavLink to={`/AvailableEventsForCustomer`}><Button variant="secondary" style={{ marginLeft: "100px", width: "340px", marginTop: "43px" }}>Back</Button></NavLink>
            </div>

            <div style={{ float: "left", width: "100px" }}>
                <img src={typeof (geteventdata.EventImage) !== 'undefined' ? require(`../eventManagement/EventImages/${geteventdata.EventImage}`) : 'Error'} style={{ width: "400px", height: "300px", margin: "auto" }} alt="Event" />
            </div>
        </div>
    )
}
export default EventForCustomer
