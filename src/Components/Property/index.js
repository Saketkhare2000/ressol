import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { slideUp } from "../../Animation";
import { Example } from "../Carousel/Example";
import axios from "axios";
import "./style.css";
import Loader from "../Loader";
const Property = () => {
  const id = useParams().slug;
  console.log(id)
  const [propertyDetails, setPropertyDetails] = React.useState({});
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/property/${id}/`)
      .then(res => {
        setLoader(true)
        setPropertyDetails(res.data)
      }).then(() => {
        setLoader(false)
      })
  }, []);
  function numDifferentiation(value) {
    var val = Math.abs(value)
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + ' Cr';
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + ' Lac';
    }
    return val;
  }

  return (
    loader ? <Loader /> :
      (<motion.div
        initial="show"
        animate="animate"
        exit="exit"
        variants={slideUp}
        className="page"
      >
        <div className="each-property">
          <h1 className="mobile-title">
            {propertyDetails.name} | {propertyDetails.location}
          </h1>
          <Example />
          <h1 className="mobile-title">More Details:</h1>
          <div className="parent">
            <div className="grid-child div1">
              <span>Rent</span>
              <p>₹ {numDifferentiation(propertyDetails.price)}</p>
            </div>
            <div className="grid-child div2">
              <span>Rent</span>
              <p>₹ {numDifferentiation(propertyDetails.price)}</p>
            </div>
            <div className="grid-child div3">
              <span>Area</span>
              <p>{propertyDetails.property_size}</p>
            </div>
            <div className="grid-child div4">
              <span>Configuration</span>
              <p>
                {propertyDetails.bedrooms} BHK, {propertyDetails.bathrooms} Bath
              </p>
            </div>
            <div className="grid-child div5">
              <span>Furnishing</span>
              {propertyDetails.furnishing_status ? (<p>Furnished</p>) : (<p>Un Furnished</p>)}
            </div>
            <div className="grid-child div6">
              <span>Posted On</span>
              <p>{propertyDetails.postedOn}</p>
            </div>
          </div>
          <div className="description">
            <h1 className="mobile-title">Description:</h1>
            <h4>{propertyDetails.address}, {propertyDetails.pincode}</h4>
            <p>{propertyDetails.description}</p>
          </div>
        </div>
      </motion.div>)
  );
};

export default Property;
