import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const DisplayCard = ({ title, data }) => {
  return data.map((item, index) => (
    <Link className="displaycard" to="/propertylist" key={index}>
      <div key={index} className="displaycard-details">
        <img src={item.img} alt="" />
        <div className="overlay"></div>
        <p>{item.imgTitle}</p>
      </div>
    </Link>
  ));
};

export default DisplayCard;
