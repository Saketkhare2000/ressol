import React from "react";
import "./style.css";

const DisplayCard = ({ title, data }) => {
  return data.map((item, index) => (
    <div className="displaycard" key={index}>
      <div key={index} className="displaycard-details">
        <img src={item.img} alt="" />
        <div className="overlay"></div>
        <p>{item.imgTitle}</p>
      </div>
    </div>
  ));
};

export default DisplayCard;
