import { useSelector } from "react-redux";
import React, { useContext, useState } from "react";
import { WebContext } from "../../Context/WebContext";

import { Link, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Loader from "../Loader";
import "./style.css";
import { motion } from "framer-motion";
const PropertyDeatiledCard = () => {
  const navigate = useNavigate();
  const result = useParams().slug.toLowerCase();
  const propertyList = useSelector((state) => state.propertyList.propertyData);
  const userDetails = useSelector((state) => state.userData.userData);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const { setAlert, base_url } = useContext(WebContext);
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [contactStatus, setContactStatus] = useState(false);

  console.log(userDetails.wishlist);
  function numDifferentiation(value) {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + " Cr";
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + " Lac";
    }
    return val;
  }
  const addToWishlist = (propertyid) => {
    if (loggedIn) {
      axios({
        method: "post",
        url: `${base_url}api/wish`,
        data: {
          profile: userDetails.id,
          property: propertyid,
        },
      })
        .then((res) => {
          console.log("Clicked");
          setWishlistStatus(!wishlistStatus);
        })
        .catch((err) => {});
    } else {
      navigate("/login");
    }
  };
  const handleContact = () => {
    if (loggedIn) {
      axios({
        method: "post",
        url: `${base_url}api/contact`,
        data: {
          buyer: userDetails.id,
          // owner: propertyDetails.posted_by.id,
          // property: propertyDetails.id,
        },
      })
        .then((res) => {
          setContactStatus(!contactStatus);
          setAlert({
            show: true,
            message: "Owner Contacted",
            type: "success",
          });
          setTimeout(() => {
            setAlert({
              show: false,
              message: "",
              type: "",
            });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  };
  const NavigateTo = (path) => {
    setAlert({
      show: true,
      message: "Login To Continue",
      type: "danger",
    });
    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
    navigate(path);
  };
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <div className="back property-list-back" onClick={() => navigate("/")}>
        <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        <h2 className="mobile-title">
          Properties <span className="city-name"> ({result}) </span>
        </h2>
        {/* <p>Go Back</p> */}
      </div>
      {propertyList ? (
        Object.keys(propertyList).map((property, index) => {
          return (
            <div className="property-card">
              <Link to={`/property/${propertyList[property].id}`}>
                <div key={index} className="property-detail-card">
                  <div className="img-container">
                    {propertyList[property].image.length > 0 ? (
                      <img
                        src={propertyList[property].image[0].image.full_size}
                        alt=""
                      />
                    ) : (
                      <img src={SamplePropertyImage} alt="" />
                    )}
                  </div>
                  <div className="property-detail-card-details">
                    <p className="property-price">
                      ₹ {numDifferentiation(propertyList[property].price)}
                    </p>
                    <p className="property-name">
                      {propertyList[property].property_name}
                    </p>
                    {/* <p className="property-type">
                      {propertyList[property].property_type}
                    </p> */}
                    {(() => {
                      if (propertyList[property].property_type === "FL") {
                        return <p className="property-type">Flat</p>;
                      } else if (
                        propertyList[property].property_type === "VI"
                      ) {
                        return <p className="property-type">House</p>;
                      } else if (
                        propertyList[property].property_type === "PT"
                      ) {
                        return <p className="property-type">Plot</p>;
                      } else {
                        return <p className="property-type">Commercial</p>;
                      }
                    })()}
                    <p className="property-city">
                      {propertyList[property].location},{" "}
                      {propertyList[property].city}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="property-detail-btn-container">
                {/* {wishlistStatus ? (
                  <button className="btn btn-secondary" onClick={addToWishlist}>
                    Remove From Wishlist
                  </button>
                ) : (
                  <button className="btn btn-secondary" onClick={addToWishlist}>
                    Add To Wishlist
                  </button>
                )} */}
                {(() => {
                  if (loggedIn) {
                    return (
                      <>
                        {wishlistStatus ? (
                          <button
                            className="btn btn-secondary"
                            onClick={() =>
                              addToWishlist(propertyList[property].id)
                            }
                          >
                            Remove From Wishlist
                          </button>
                        ) : (
                          <button
                            className="btn btn-secondary"
                            onClick={() =>
                              addToWishlist(propertyList[property].id)
                            }
                          >
                            Add To Wishlist
                          </button>
                        )}
                        <button
                          className="btn btn-primary"
                          onClick={handleContact}
                        >
                          Contact Agent
                        </button>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <button
                          className="btn btn-secondary"
                          onClick={() => NavigateTo("/login")}
                        >
                          Add To Wishlist
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => NavigateTo("/login")}
                        >
                          Contact Agent
                        </button>
                      </>
                    );
                  }
                })()}
                {/* <button className="btn btn-secondary">Add To Wishlist</button>
                <button className="btn btn-primary">Contact Agent</button> */}
              </div>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </motion.div>
  );
};

export default PropertyDeatiledCard;
