import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SampleUserImg from "../../assets/images/sample-user-img.png";
import { useParams } from 'react-router-dom';
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { slideUp } from "../../Animation";
import { Example } from "../Carousel/Example";
import axios from "axios";
import "./style.css";
import Loader from "../Loader";
const Property = () => {
  const id = useParams().slug;
  const [propertyDetails, setPropertyDetails] = React.useState({});
  // const [propertyImagesData, setPropertyImagesData] = React.useState([]);
  const [imageData, setImageData] = React.useState([]);
  const userDetails = useSelector((state) => state.userData.userData);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const navigate = useNavigate();
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/property/${id}/?expand=posted_by.image,image`)
      .then(res => {
        setLoader(true)
        setPropertyDetails(res.data)
        return res.data
      })
      .then((res) => {
        setLoader(false)
        console.log(res.image)
        if (res.image && res.image.length > 0) {
          const propertyImagesData = [];
          res.image.map((image, index) => {
            return propertyImagesData.push(image.image.full_size)
          }
          )
          console.log(propertyImagesData)
          setImageData(propertyImagesData)
        }
        else {
          setImageData([SamplePropertyImage])
        }
      })
      .catch(err => {
        console.log(err);
      })
  }, [])
  console.log(imageData)
  // if (loggedIn) {
  //   console.log(userDetails.wishlist);
  //   userDetails.wishlist.map(property => {
  //     if (property.id === propertyDetails.id) {
  //       return setWishlistStatus(true)
  //     }
  //     else {
  //       return setWishlistStatus(false)
  //     }
  //   })
  // }
  // else {
  //   return setWishlistStatus(false)
  // }
  // console.log(propertyDetails)
  // console.log(propertyImagesData)
  function numDifferentiation(value) {
    var val = Math.abs(value)
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + ' Cr';
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + ' Lac';
    }
    return val;
  }
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

      axios({
        method: "post",
        url: `http://localhost:8000/api/wish`,
        data: {
          profile: userDetails.id,
          property: propertyDetails.id,
        },
      })
        .then((res) => {
          console.log("Clicked")
          setWishlistStatus(!wishlistStatus)

        })
        .catch((err) => {
          console.log(err);
        });
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
          <Example data={imageData} />
          <h2 className="mobile-title">Property Details</h2>
          <div className="parent">
            <div className="grid-child div1">
              <span>Name</span>
              <p>{propertyDetails.property_name}</p>
            </div>
            <div className="grid-child div2">
              <span>Price</span>
              <p>₹ {numDifferentiation(propertyDetails.price)}</p>
              {/* <p>{(propertyDetails.address)}</p> */}
            </div>
            <div className="grid-child div3">
              <span>City</span>
              <p className="property-city">{propertyDetails.city}</p>
            </div>
            <div className="grid-child div4">
              <span>State</span>
              <p className="property-state">
                {propertyDetails.state}
              </p>
            </div>

          </div>
          <div className="property-btn-container">
            <button className="btn btn-primary" onClick={handleContact}>
              Contact Owner
            </button>
            {wishlistStatus ? <button className="btn btn-secondary" onClick={addToWishlist}>
              Remove From Wishlist
            </button> : <button className="btn btn-secondary" onClick={addToWishlist}>
              Add To Wishlist
            </button>}



          </div>
          {/* Description Section   */}
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
              <h4 className="specification-value"  >{propertyDetails.furnishing_status}</h4>
            </div>
          </div>
          {/* Amenities Section  */}
          <div className="amenities-section">
            <h2 className="mobile-title">Amenities</h2>
            <div className="amenities-container">
              <div className="amenities-child">
                <h4>Amenities</h4>
              </div>
            </div>
            {/* <div className="amenities-container">
              <div className="amenities-child">
                <h4>Amenities</h4>
                <ul>
                  {propertyDetails.amenities.map((amenity, index) => {
                    return <li key={index}>{amenity}</li>
                  })}
                </ul>
              </div>
            </div> */}
          </div>
          {/* About Owner Description  */}
          <div className="about-owner-container">
            <h2 className="mobile-title">Posted By</h2>
            <div className="owner-details">
              <div className="owner-image">
                {propertyDetails.posted_by.image == null ? (
                  <img src={SampleUserImg} alt="user" />
                ) : (
                  <img src={propertyDetails.posted_by.image.image.full_size} alt="user" />
                )}
              </div>
              <div className="owner-contact">
                <h3>{propertyDetails.posted_by.username}</h3>
                <p>Location: {propertyDetails.posted_by.city}, {propertyDetails.posted_by.state}</p>
              </div>
              <button className="btn btn-primary" onClick={handleContact}>
                Contact Owner
              </button>
            </div>
          </div>.
        </div>
      </motion.div >)
  );
};

export default Property;
