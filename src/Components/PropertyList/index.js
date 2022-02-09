import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPropertyList } from "../../actions/userActions";
import Loader from "../Loader";
import "./style.css";
import { motion, AnimatePresence } from "framer-motion";
const PropertyDeatiledCard = () => {
  const dispatch = useDispatch();
  const city = (useParams().slug).toLowerCase();
  console.log(city)
  useEffect(() => {
    dispatch(getPropertyList(city))
  }, []);
  const propertyList = useSelector(state => state.propertyList.propertyData);
  function numDifferentiation(value) {
    var val = Math.abs(value)
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + ' Cr';
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + ' Lac';
    }
    return val;
  }
  //cardData state
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <h1 className="mobile-title">Properties in <span className="city-name"> {city} </span></h1>
      {
        propertyList ? Object.keys(propertyList).map((property, index) => {
          return (
            <AnimatePresence>
              <Link to={`/property/${propertyList[property].id}`}>
                <div key={index} className="property-detail-card">
                  <div className="img-container">
                    <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1" alt="" />
                  </div>
                  <div className="property-detail-card-details">
                    <p className="bed">
                      {propertyList[property].bedrooms} BHK {propertyList[property].name} | {propertyList[property].location}
                    </p>
                    <p className="price">₹ {numDifferentiation(propertyList[property].price)}</p>
                  </div>
                </div>
              </Link>
            </AnimatePresence>
          );
        }) : <Loader />
      }
    </motion.div>
  );
};

export default PropertyDeatiledCard;
