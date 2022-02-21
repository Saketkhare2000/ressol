import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-page page">
      <div className="about-us-header">
        <div className="back" onClick={() => navigate("/dashboard")}>
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          <h2>About Us</h2>
        </div>
      </div>
      <div className="about-us-content">
        <div className="logo">9Roof</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
          earum, harum quasi recusandae inventore similique eaque quidem sed.
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
          molestiae optio quisquam asperiores quia neque perspiciatis nisi ut
          voluptatibus aliquam? Excepturi, molestiae doloremque. Itaque autem
          quibusdam vel, laboriosam non, magni quos sequi nobis iusto eaque
          saepe sed nihil maiores atque?
        </p>
        <div className="company-details">
          <div className="company-details-item">
            <h3>
              Started in: <span>2022</span>
            </h3>
          </div>
          <div className="company-details-item">
            <h3>
              Company location: <span>Indore</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
