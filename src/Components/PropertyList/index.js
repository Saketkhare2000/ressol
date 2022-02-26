import { useSelector } from "react-redux";
import React, { useContext, useEffect, useState } from "react";
import { WebContext } from "../../Context/WebContext";
import { FaCrown } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getPropertyList } from "../../actions/userActions";
import Cookies from "js-cookie";
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
  const dispatch = useDispatch();
  const result = useParams().slug.toLowerCase();
  const propertyList = useSelector((state) => state.propertyList.propertyData);
  const [userId, setUserId] = useState([]);
  // const loggedIn = useSelector((state) => state.auth.loggedIn);
  // const loggedIn = Cookies.get('loggedIn') === 'true' ? true : false;
  // const phoneNumber = Cookies.get("phonenumber");
  const { setAlert, base_url, paramsData, setParamsData, listSlug, setListSlug, phoneNumber, loggedIn } = useContext(WebContext);
  // const paramsDataCookie = Cookies.set("paramsData", JSON.stringify(paramsData));
  // console.log(JSON.parse(paramsDataCookie));
  const [wishlistStatus, setWishlistStatus] = useState(false);
  const [contactStatus, setContactStatus] = useState(false);
  const [wishlistDetails, setWishlistDetails] = useState([]);
  const [contactDetails, setContactDetails] = useState([]);
  // Get slug from the url
  const { slug } = useParams();
  setListSlug(slug);

  useEffect(() => {
    dispatch(getPropertyList(paramsData, base_url));
    if (loggedIn) {
      axios({
        method: "get",
        url: `${base_url}api/profile/${phoneNumber}/`,
      }).then(res => {
        setUserId(res.data.id);
        setWishlistDetails(res.data.wishlist);
        setContactDetails(res.data.contacted_to);
      })
    }
  }, []);

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
          profile: userId,
          property: propertyid,
        },
      })
        .then((res) => {
          console.log("Clicked");
          setWishlistStatus(!wishlistStatus);
        })
        .catch((err) => { });
    } else {
      navigate("/login");
    }
  };

  const handleContact = (owner, property) => {
    if (loggedIn) {
      axios({
        method: "post",
        url: `${base_url}api/contact`,
        data: {
          buyer: userId,
          owner: owner,
          property: property,
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

          console.log(wishlistDetails.find(data => data == propertyList[property].id), propertyList[property].id)
          console.log(wishlistDetails.find(data => data == propertyList[property].id) == propertyList[property].id)
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
                    <div className="property-price-name">
                      <p className="property-price">
                        ₹ {numDifferentiation(propertyList[property].price)}
                      </p>
                      <p className="property-name">
                        {propertyList[property].property_name}
                      </p>
                    </div>
                    <div className="property-posted-by">
                      {(() => {
                        if (propertyList[property].posted_by.user_type === "Agent") {
                          return <p className="property-user-type">Agent</p>;
                        } else if (
                          propertyList[property].posted_by.user_type === "Buyer/Owner"
                        ) {
                          return <p className="property-user-type">Individual</p>;
                        } else {
                          return <></>;
                        }
                      })()}
                      {(() => {
                        if (propertyList[property].posted_by.prime_status?.is_prime) {
                          return <p className="property-prime"><FaCrown />Prime Verified</p>;
                        } else {
                          return <></>;
                        }
                      })()}
                    </div>
                    {/* <p className="property-type">
                      {propertyList[property].property_type}
                    </p> */}
                    <div className="property-type-for">
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
                      {(() => {
                        if (propertyList[property].for_status === "sale") {
                          return <p className="property-for">for Sale</p>;
                        } else if (propertyList[property].for_status === "rent") {
                          return <p className="property-for">for Rent</p>;
                        } else {
                          return <></>;
                        }
                      })()}
                    </div>
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
                        {/* {wishlistStatus ? (
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
                        )} */}

                        {
                          wishlistDetails.find(data => data == propertyList[property].id) === propertyList[property].id ? (
                            <button
                              className="btn btn-secondary"
                              onClick={() => {
                                addToWishlist(propertyList[property].id)
                                setWishlistDetails((oldList) => [...oldList.filter((data) => data != propertyList[property].id)])
                              }}
                            >
                              Remove From Wishlist
                            </button>
                          ) : (
                            <button
                              className="btn btn-secondary"
                              onClick={() => {
                                addToWishlist(propertyList[property].id);
                                setWishlistDetails((oldList) => [...oldList, propertyList[property].id]);
                              }}
                            >
                              Add To Wishlist
                            </button>
                          )
                        }

                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            handleContact(propertyList[property].posted_by, propertyList[property].id);
                            setContactDetails((oldList) => [...oldList, propertyList[property].id]);
                          }}
                        >

                          {contactDetails.find(data => data == propertyList[property].id) != propertyList[property].id ? (
                            "Contact") : (`Contacted`)
                          }
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
