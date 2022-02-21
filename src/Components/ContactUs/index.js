import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-us-page page">
      <div className="contact-us-header">
        <div className="back" onClick={() => navigate("/dashboard")}>
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          <h2>Contact Us</h2>
        </div>
      </div>
      <div className="contact-us-content">
        <p>
          Phone: <span>+91-99999-XXXXX</span>
        </p>
        <p>
          Email: <span>abc.def@xyz.com</span>
        </p>
        <p>
          Head office: <span>Lorem ipsum dolor, sit amet.</span>
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
