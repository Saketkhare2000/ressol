import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SampleUserImg from "../../assets/images/sample-user-img.png";
import { useParams } from "react-router-dom";
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
  const [contactStatus, setContactStatus] = useState(false);
  const [loader, setLoader] = React.useState(true);
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/property/${id}/?expand=posted_by.image,image`
      )
      .then((res) => {
        setLoader(true);
        setPropertyDetails(res.data);
        return res.data;
      })
      .then((res) => {
        setLoader(false);
        console.log(res.image);
        if (res.image && res.image.length > 0) {
          const propertyImagesData = [];
          res.image.map((image, index) => {
            return propertyImagesData.push(image.image.full_size);
          });
          console.log(propertyImagesData);
          setImageData(propertyImagesData);
        } else {
          setImageData([SamplePropertyImage]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(imageData);
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
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + " Cr";
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + " Lac";
    }
    return val;
  }

  const handleContact = () => {
    if (loggedIn) {
      console.log(propertyDetails);
      axios({
        method: "post",
        url: `http://localhost:8000/api/contact`,
        data: {
          buyer: userDetails.id,
          owner: propertyDetails.posted_by.id,
          property: propertyDetails.id,
        },
      })
        .then((res) => {
          console.log("Contact");
          setContactStatus(!contactStatus);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  };

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
          console.log("Clicked");
          setWishlistStatus(!wishlistStatus);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  };
  console.log(propertyDetails.property_type);

  return loader ? (
    <Loader />
  ) : (
    <div
      initial="show"
      animate="animate"
      exit="exit"
      variants={slideUp}
      className="page"
    >
      <div className="each-property">
        <div className="property-details">
          <Example data={imageData} />
          <div className="property-details-child">
            <h2 className="mobile-title">Property Details</h2>
            <div className="parent">
              <div className="grid-child div1">
                <span>Name</span>
                <p>{propertyDetails.property_name}</p>
              </div>
              <div className="grid-child div2">
                <span>Price</span>
                <p>₹ {propertyDetails.price}</p>
                {/* <p>{(propertyDetails.address)}</p> */}
              </div>
              <div className="grid-child div3">
                <span>Property Type</span>
                {(() => {
                  // Flat/Apartment Property Type Filters
                  if (propertyDetails.property_type === "FL") {
                    return <p>Flat/Apartment</p>;
                  } else if (propertyDetails.property_type === "VI") {
                    return <p>House/Villa</p>;
                  } else if (propertyDetails.property_type === "PT") {
                    return <p>Plot</p>;
                  } else if (propertyDetails.property_type === "CM") {
                    return <p>Commercial</p>;
                  } else {
                    return <></>;
                  }
                })()}
              </div>
              <div className="grid-child div4">
                <span>For</span>
                <p className="property-state">{propertyDetails.for_status}</p>
              </div>
            </div>
            <div className="property-btn-container">
              {contactStatus ? (
                <button className="btn btn-primary" onClick={handleContact}>
                  Already Contacted
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleContact}>
                  Contact Owner
                </button>
              )}

              {wishlistStatus ? (
                <button className="btn btn-secondary" onClick={addToWishlist}>
                  Remove From Wishlist
                </button>
              ) : (
                <button className="btn btn-secondary" onClick={addToWishlist}>
                  Add To Wishlist
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Conditional Rendering  */}
        {/* ----------------Description Section Starts ------------------  */}
        {(() => {
          // Flat/Apartment Property Type Filters
          if (
            propertyDetails.property_type === "FL" ||
            propertyDetails.property_type === "VI"
          ) {
            return (
              <div className="description">
                <h2 className="mobile-title">Description</h2>
                <p>{propertyDetails.description}</p>
                {/* Property Specifications Starts  */}

                {/* Locality  */}
                <div className="specification-container">
                  <h4 className="specification-title">Locality</h4>
                  <h4 className="specification-value">
                    {propertyDetails.location}
                  </h4>
                </div>
                {/* City  */}
                <div className="specification-container">
                  <h4 className="specification-title">City</h4>
                  <h4 className="specification-value">
                    {propertyDetails.city}
                  </h4>
                </div>
                {/* Address  */}
                <div className="specification-container">
                  <h4 className="specification-title">Address</h4>
                  <h4 className="specification-value">
                    {propertyDetails.address}
                  </h4>
                </div>
                {/* Area  */}
                <div className="specification-container">
                  <h4 className="specification-title">Area</h4>
                  <h4 className="specification-value">
                    {propertyDetails.property_size} <span>sq-ft</span>
                  </h4>
                </div>
                {/* Bedrooms  */}
                <div className="specification-container">
                  <h4 className="specification-title">Bedrooms</h4>
                  <h4 className="specification-value">
                    {propertyDetails.bedrooms}
                  </h4>
                </div>
                <div className="specification-container">
                  <h4 className="specification-title">Bathrooms</h4>
                  <h4 className="specification-value">
                    {propertyDetails.bathrooms}
                  </h4>
                </div>
                <div className="specification-container">
                  <h4 className="specification-title">Floor</h4>
                  <h4 className="specification-value">
                    {propertyDetails.floor}
                  </h4>
                </div>
                <div className="specification-container">
                  <h4 className="specification-title">Furnishing</h4>
                  <h4 className="specification-value">
                    {propertyDetails.furnishing_status}
                  </h4>
                </div>
                <div className="specification-container">
                  <h4 className="specification-title">Possession Status</h4>
                  <h4 className="specification-value">
                    {propertyDetails.possession}
                  </h4>
                </div>
                <div className="specification-container">
                  <h4 className="specification-title">Available From</h4>
                  <h4 className="specification-value">
                    {propertyDetails.availability}
                  </h4>
                </div>
              </div>
            );
          } else if (propertyDetails.property_type === "PT") {
            return (
              <div className="description">
                <h2 className="mobile-title">Description</h2>
                <p>{propertyDetails.description}</p>
                {/* Property Specifications Starts  */}

                {/* Location  */}
                <div className="specification-container">
                  <h4 className="specification-title">Location</h4>
                  <h4 className="specification-value">
                    {propertyDetails.location}
                  </h4>
                </div>
                {/* City  */}
                <div className="specification-container">
                  <h4 className="specification-title">City</h4>
                  <h4 className="specification-value">
                    {propertyDetails.city}
                  </h4>
                </div>
                {/* Address  */}
                <div className="specification-container">
                  <h4 className="specification-title">Address</h4>
                  <h4 className="specification-value">
                    {propertyDetails.address}
                  </h4>
                </div>
                {/* Area  */}
                <div className="specification-container">
                  <h4 className="specification-title">Area</h4>
                  <h4 className="specification-value">
                    {propertyDetails.property_size} <span>sq-ft</span>
                  </h4>
                </div>
                {/* Corner  */}
                <div className="specification-container">
                  <h4 className="specification-title">Corner Plot</h4>
                  {propertyDetails.corner ? (
                    <h4 className="specification-value">Yes</h4>
                  ) : (
                    <h4 className="specification-value">No</h4>
                  )}
                </div>
                {/* Gated Community  */}
                <div className="specification-container">
                  <h4 className="specification-title">
                    Inside Gated Community
                  </h4>
                  {propertyDetails.gated ? (
                    <h4 className="specification-value">Yes</h4>
                  ) : (
                    <h4 className="specification-value">No</h4>
                  )}
                </div>
              </div>
            );
          } else if (propertyDetails.property_type === "CM") {
            return (
              <div className="description">
                <h2 className="mobile-title">Description</h2>
                <p>{propertyDetails.description}</p>
                {/* Property Specifications Starts  */}

                {/* Locality  */}
                <div className="specification-container">
                  <h4 className="specification-title">Locality</h4>
                  <h4 className="specification-value">
                    {propertyDetails.location}
                  </h4>
                </div>
                {/* City  */}
                <div className="specification-container">
                  <h4 className="specification-title">City</h4>
                  <h4 className="specification-value">
                    {propertyDetails.city}
                  </h4>
                </div>
                {/* Address  */}
                <div className="specification-container">
                  <h4 className="specification-title">Address</h4>
                  <h4 className="specification-value">
                    {propertyDetails.address}
                  </h4>
                </div>
                {/* Area  */}
                <div className="specification-container">
                  <h4 className="specification-title">Area</h4>
                  <h4 className="specification-value">
                    {propertyDetails.property_size} <span>sq-ft</span>
                  </h4>
                </div>

                <div className="specification-container">
                  <h4 className="specification-title">Washrooms</h4>
                  <h4 className="specification-value">
                    {propertyDetails.bathrooms}
                  </h4>
                </div>
                <div className="specification-container">
                  <h4 className="specification-title">Floor</h4>
                  <h4 className="specification-value">
                    {propertyDetails.floor}
                  </h4>
                </div>
                <div className="specification-container">
                  <h4 className="specification-title">Furnishing</h4>
                  <h4 className="specification-value">
                    {propertyDetails.furnishing_status}
                  </h4>
                </div>
                <div className="specification-container">
                  <h4 className="specification-title">Possession Status</h4>
                  <h4 className="specification-value">
                    {propertyDetails.possession}
                  </h4>
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        })()}

        {/* ----------------Description Section Ends ------------------  */}
        {/* Amenities Section  */}
        {(() => {
          if (
            propertyDetails.property_type === "FL" ||
            propertyDetails.property_type === "VI" ||
            propertyDetails.property_type === "CM"
          ) {
            return (
              <div className="amenities-container">
                <h2 className="mobile-title">Amenities</h2>
                <div className="amenities-list">
                  {propertyDetails.amenities.length > 0 ? (
                    propertyDetails.amenities.map((amenity, index) => {
                      return (
                        <div className="amenities-card" key={index}>
                          {/* <img src={amenity.icon} alt="amenity" /> */}
                          {amenity}
                        </div>
                      );
                    })
                  ) : (
                    <div className="amenities-card">No Amenities Available</div>
                  )}
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        })()}

        {/* About Owner Description  */}
        <div className="about-owner-container">
          <h2 className="mobile-title">Posted By</h2>
          <div className="owner-details">
            <div className="owner-image">
              {propertyDetails.posted_by.image == null ? (
                <img src={SampleUserImg} alt="user" />
              ) : (
                <img
                  src={propertyDetails.posted_by.image.image.full_size}
                  alt="user"
                />
              )}
            </div>
            <div className="owner-contact">
              <h3>{propertyDetails.posted_by.username}</h3>
              <p>
                Location: {propertyDetails.posted_by.city},{" "}
                {propertyDetails.posted_by.state}
              </p>
            </div>
            <button className="btn btn-primary" onClick={handleContact}>
              Contact Owner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
