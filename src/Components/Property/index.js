import { motion } from "framer-motion";
import React from "react";
import { slideUp } from "../../Animation";
import "./style.css";
const Property = () => {
  const data = {
    img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    location: "Delhi",
    price: "Rs. 25lac",
    bed: "3",
    bath: "2",
    area: "2.5 Acres",
    propertyType: "Apartment",
    propertyId: "1",
    furnishing: "Furnished",
    postedOn: "1 day ago",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque unde velit temporibus consectetur ad. Itaque velit tenetur praesentium obcaecati repellat.",
  };
  return (
    <motion.div
      initial="show"
      animate="animate"
      exit="exit"
      variants={slideUp}
      className="page"
    >
      <div className="each-property">
        <h1 className="mobile-title">
          {data.bed} BHK Bungalow | {data.location}
        </h1>
        <img className="" src={data.img} alt="" />
        <h1 className="mobile-title">More Details:</h1>
        <div className="parent">
          <div className="grid-child div1">
            <span>Rent</span>
            <p>{data.price}</p>
          </div>
          <div className="grid-child div2">
            <span>Rent</span>
            <p>{data.price}</p>
          </div>
          <div className="grid-child div3">
            <span>Area</span>
            <p>{data.area}</p>
          </div>
          <div className="grid-child div4">
            <span>Configuration</span>
            <p>
              {data.bed} BHK, {data.bath} Bath
            </p>
          </div>
          <div className="grid-child div5">
            <span>Furnishing</span>
            <p>{data.furnishing}</p>
          </div>
          <div className="grid-child div6">
            <span>Posted On</span>
            <p>{data.postedOn}</p>
          </div>
        </div>
        <div className="description">
          <h1 className="mobile-title">Description:</h1>
          <p>{data.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Property;
