import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../Images/image1.png";
import img2 from "../Images/image2.jpg";
import img3 from "../Images/image3.jpg";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import img4 from "../Images/image4.jpg";
import GroupsIcon from "@mui/icons-material/Groups";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import PetsIcon from "@mui/icons-material/Pets";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import BedIcon from "@mui/icons-material/Bed";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BusinessIcon from "@mui/icons-material/Business";
import MailIcon from "@mui/icons-material/Mail";

function Home() {
  return (
    <div style={{ marginLeft: "100px" }}>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <h1>
          <b>CISP Hotel</b>
        </h1>
        Welcome to the your next home
      </div>

      <CardGroup>
        <Card
          style={{ width: "100px", marginLeft: "100px", marginRight: "100px" }}
        >
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block w-100 mx-auto px-1"
                src={img1}
                alt="First slide"
                style={{ width: "1000px", height: "400px" }}
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100 mx-auto"
                src={img2}
                alt="Second slide"
                style={{ width: "1000px", height: "400px" }}
              />
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img3}
                alt="Third slide"
                style={{ width: "1000px", height: "400px" }}
              />
            </Carousel.Item>
          </Carousel>

          <Card.Body>
            <Card.Text>
              Finding the right space for your function is never easy and
              getting advice from friends, family, clients, co-workers or anyone
              is always great. we at amalya provides you a life time experience
              with our brand new wedding reception hallsand holiday resort which
              can be used for a memorable day in your life. First, it's always
              best to shop around for several locations to see what's on offer
              (and within budget) and always consider booking your party venue
              at least several months to a year in advance, say the experts.
              Take your time, and don't settle for the first location that comes
              along. Unusual venues like historic mansions, galleries, and even
              sailing yachts can provide memorable party spaces. Before you make
              the final decision, also remember to take into account who is on
              your guest list, and how accessible it may be for everyone
              involved.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>

      <br />

      <div className="container">
        <div className="row">
          <div className="col">
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    Our Services
                  </Card.Title>
                </Card.Body>
              </Card>
            </CardGroup>

            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <TimeToLeaveIcon />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>
                    Free Parking
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <BedIcon />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>
                    Luxury Rooms
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>

            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <EventSeatIcon />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>Events</Card.Text>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <PetsIcon />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>
                    Pet-friendly rooms
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>

            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <RoomServiceIcon />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>
                    Room service
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <GroupsIcon />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>
                    Meeting rooms
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>

            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <RestaurantIcon />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>
                    Restaurant
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <FitnessCenterIcon />
                  </Card.Title>
                  <Card.Text style={{ textAlign: "center" }}>
                    Fitness center
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
          <div className="col">
            <CardGroup>
              <Card>
                <Card.Body>
                  <Card.Title style={{ textAlign: "center" }}>
                    <i className="bi bi-telephone"></i>About Us
                  </Card.Title>
                </Card.Body>
              </Card>
            </CardGroup>
            <CardGroup>
              <Card>
                <Card.Img variant="top" src={img4} />
                <Card.Body>
                  <Card.Text>
                    <BusinessIcon /> No:556, Moragahahena, Pitipana North,
                    Homagama, Sri Lanka
                    <br />
                    <br />
                    <ContactPhoneIcon /> Tel/Fax :94 11 2748913, 4404040
                    <br />
                    <br />
                    <LocalPhoneIcon /> Mobile:77 7743612
                    <br />
                    <br />
                    <MailIcon /> Email:info@cisphotel.com
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
