import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import "./style.css";

const PropertyDeatiledCard = () => {
  //cardData state
  const cardData = [
    {
      img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      location: "Mumbai",
      price: "Rs. 1.5Cr",
      bed: "3",
      bath: "2",
      area: "2.5 Acres",
      propertyType: "Apartment",
      propertyId: "1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      location: "Delhi",
      price: "Rs. 25lac",
      bed: "3",
      bath: "2",
      area: "2.5 Acres",
      propertyType: "Apartment",
      propertyId: "1",
    },
    {
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      location: "Delhi",
      price: "Rs. 25lac",
      bed: "3",
      bath: "2",
      area: "2.5 Acres",
      propertyType: "Apartment",
      propertyId: "1",
    },
    {
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      location: "Delhi",
      price: "Rs. 25lac",
      bed: "3",
      bath: "2",
      area: "2.5 Acres",
      propertyType: "Apartment",
      propertyId: "1",
    },
    {
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      location: "Delhi",
      price: "Rs. 25lac",
      bed: "3",
      bath: "2",
      area: "2.5 Acres",
      propertyType: "Apartment",
      propertyId: "1",
    },
  ];
  return (
    <Link to="/property">
      <h1 className="mobile-title">Properties in Delhi</h1>
      {cardData.map((card, index) => {
        return (
          <div key={index} className="property-detail-card">
            <div className="img-container">
              <img src={card.img} alt="" />
            </div>
            <div className="property-detail-card-details">
              <p className="bed">
                {card.bed} BHK {card.propertyType} | {card.location}
              </p>
              <p className="price">{card.price}</p>
              {/* <p className="desc">{card.description}</p> */}
              {/* <Button title={"Contact Seller"} variant={"secondary"} /> */}
            </div>
          </div>
        );
      })}
    </Link>
  );
};

export default PropertyDeatiledCard;
