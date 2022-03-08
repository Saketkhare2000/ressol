import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import {
  FaGooglePlay,
  FaApple,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-content">
          <div className="download">
            Download our app:
            <FaGooglePlay className="storeIcons" style={{ fontSize: "16px" }} />
            <FaApple className="storeIcons" style={{ fontSize: "18px" }} />
          </div>
          <div className="social-links">
            Connect with us:
            <a href="#">
              <FaFacebook
                className="social-icons"
                style={{ fontSize: "18px" }}
              />
            </a>
            <a href="#">
              <FaTwitter
                className="social-icons"
                style={{ fontSize: "18px" }}
              />
            </a>
            <a href="#">
              <FaWhatsapp
                className="social-icons"
                style={{ fontSize: "18px" }}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-content">
          <div className="logo">
            <Link to="/">Reessol</Link>
            <span> &copy; 2022 Reessol. All Rights Reserved.</span>
          </div>
          <div className="details">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          <div className="developer">
            Developed by <a href="http://cybercycloid.com/">Cybercycloid</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
