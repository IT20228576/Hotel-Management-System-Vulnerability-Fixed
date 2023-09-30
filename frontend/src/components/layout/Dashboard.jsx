import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Styles/DashboardStyles.css";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BedIcon from "@mui/icons-material/Bed";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function Dashboard() {
  return (
    <div className="container">
      <Card.Header>
        <h1 style={{ textAlign: "center", marginTop: "2rem" }}> DASHBOARD </h1>
      </Card.Header>
      <div className="dashboard-container">
        <div className="dashboard-col">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <a href="/users">
                <Button className="dashboard-button">
                  USERS <br />
                  <ManageAccountsIcon sx={{ fontSize: 50 }} />
                </Button>
              </a>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <a href="/view">
                <Button className="dashboard-button">
                  EVENTS <br />
                  <PhotoCameraBackIcon sx={{ fontSize: 50 }} />
                </Button>
              </a>
            </Card.Body>
          </Card>
        </div>

        <div className="dashboard-row">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <a href="/viewRooms">
                <Button className="dashboard-button">
                  ROOMS <br />
                  <BedIcon sx={{ fontSize: 50 }} />
                </Button>
              </a>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <a href="/reservations">
                <Button className="dashboard-button">
                  RESERVATIONS <br />
                  <CalendarMonthIcon sx={{ fontSize: 50 }} />
                </Button>
              </a>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
