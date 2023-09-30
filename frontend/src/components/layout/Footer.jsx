import React from "react";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./Styles/FooterStyles.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="main-footer-container">
          <div className="col">
            <div className="row">
              <div className="col border-line">
                +94 2812 567 <br /> Call us it's toll-free
              </div>
              <div className="col">
                Customer Support Online Reservation Assistance.
              </div>
            </div>
          </div>
          <div className="col">
            {" "}
            <CopyrightIcon /> CISP Hotels
          </div>
          <div className="col">
            <TwitterIcon />
            <FacebookIcon />
            <InstagramIcon />
            <YouTubeIcon sx={{ fontSize: 32 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
