import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SampleUserImg from "../../assets/images/sample-user-img.png";
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
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();

  console.log(propertyDetails)
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
  // function numDifferentiation(value) {
  //   var val = Math.abs(value)
  //   if (val >= 10000000) {
  //     val = Math.floor((val / 10000000).toFixed(2)) + ' Cr';
  //   } else if (val >= 100000) {
  //     val = Math.floor((val / 100000).toFixed(2)) + ' Lac';
  //   }
  //   return val;
  // }
  const handleContact = () => {
    if (loggedIn) {
      console.log("contact")
    }
    else {
      navigate("/login")
    }
  }
  const addToWishlist = () => {
    if (loggedIn) {
      alert("Added to wishlist")
    }
    else {
      navigate("/login")
    }
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
          {/* <h2>
            {propertyDetails.property_name}
          </h2> */}
          <Example />
          <h2 className="mobile-title">Property Details</h2>
          <div className="parent">
            <div className="grid-child div1">
              <span>Name</span>
              <p>{propertyDetails.property_name}</p>
            </div>
            <div className="grid-child div2">
              <span>Locality</span>
              {/* <p>₹ {numDifferentiation(propertyDetails.price)}</p> */}
              <p>{(propertyDetails.address)}</p>
            </div>
            <div className="grid-child div3">
              <span>City</span>
              <p>{propertyDetails.city}</p>
            </div>
            <div className="grid-child div4">
              <span>State</span>
              <p>
                {propertyDetails.state}
              </p>
            </div>

          </div>
          <div className="property-btn-container">
            <button className="btn btn-primary" onClick={handleContact}>
              Contact Owner
            </button>
            <button className="btn btn-secondary" onClick={addToWishlist}>
              Wishlist
            </button>
          </div>
          <div className="description">
            <h2 className="mobile-title">Description</h2>
            <p>{propertyDetails.description}</p>
            {/* Property Specifications Starts  */}
            <div className="specification-container">
              <h4 className="specification-title">Price</h4>
              <h4 className="specification-value"><span>&#8377;</span> {propertyDetails.price}</h4>
            </div>
            <div className="specification-container">
              <h4 className="specification-title">Area</h4>
              <h4 className="specification-value">{propertyDetails.property_size} <span>sq-ft</span></h4>
            </div>
            <div className="specification-container">
              <h4 className="specification-title">Bedrooms</h4>
              <h4 className="specification-value">{propertyDetails.bedrooms}</h4>
            </div>
            <div className="specification-container">
              <h4 className="specification-title">Bathrooms</h4>
              <h4 className="specification-value">{propertyDetails.bathrooms}</h4>
            </div>
            <div className="specification-container">
              <h4 className="specification-title">Furnishing</h4>
              <h4 className="specification-value">{propertyDetails.furnishing_status}</h4>
            </div>
          </div>
          <div className="about-owner-container">
            <h2 className="mobile-title">Posted By</h2>
            <div className="owner-details">
              <div className="owner-image">
                <img src={SampleUserImg} alt="user" />
              </div>
              <div className="owner-contact">
                <h3>Name</h3>
                <p>Location: Delhi, Delhi</p>
              </div>
              <button className="btn btn-primary" onClick={handleContact}>
                Contact Owner
              </button>
            </div>
          </div>.
        </div>
      </motion.div>)
  );
};

export default Property;
