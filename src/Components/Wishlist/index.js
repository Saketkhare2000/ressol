import React, { useContext, useEffect, useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../actions/userActions";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import Cookies from "js-cookie";
import "./style.css";
import axios from "axios";
import { WebContext } from "../../Context/WebContext";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const userDetails = useSelector((state) => state.userData.userData);
  // const wishlistDetails = userDetails.wishlist
  /////////////
  // const { userName } = useContext(WebContext);
  const { base_url } = useContext(WebContext);
  const loggedIn = Cookies.get("loggedIn") === "true" ? true : false;
  const phoneNumber = Cookies.get("phonenumber");
  console.log(loggedIn, phoneNumber);
  useEffect(() => {
    dispatch(getUserData(phoneNumber, base_url));
  }, []);
  // const loggedIn = useSelector((state) => state.auth.loggedIn);

  const userDetails = useSelector((state) => state.userData.userData);
  console.log(userDetails);
  const [wishlistDetails, setWishlistDetails] = useState(userDetails.wishlist);
  function numDifferentiation(value) {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + " Cr";
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + " Lac";
    }
    return val;
  }
  const removeWishlist = (id) => {
    axios({
      method: "post",
      url: `${base_url}api/wish`,
      data: {
        profile: userDetails.id,
        property: id,
      },
    }).then((res) => {
      dispatch(getUserData(phoneNumber, base_url))
        .then((res) => {
          setWishlistDetails(res.wishlist);
        })
        .catch((err) => {});
    });
  };
  return (
    <div className="page">
      <div className="back" onClick={() => navigate("/dashboard")}>
        <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        <h2>Wishlist</h2>
      </div>
      {wishlistDetails ? (
        Object.keys(wishlistDetails).map((property, index) => {
          return (
            <div className="wishlist-property-card">
              <Link to={`/property/${wishlistDetails[property].id}`}>
                <div key={index} className="wishlist-detail-card">
                  <div className="img-container">
                    {/* <img src={wishlistDetails[property].image[0].image.full_size} alt="" /> */}
                    {wishlistDetails[property].image.length > 0 ? (
                      <img
                        src={wishlistDetails[property].image[0].image.full_size}
                        alt=""
                      />
                    ) : (
                      <img src={SamplePropertyImage} alt="" />
                    )}
                  </div>
                  <div className="property-detail-card-details">
                    <p className="property-price">
                      ₹ {numDifferentiation(wishlistDetails[property].price)}
                    </p>
                    <p className="property-name">
                      {wishlistDetails[property].property_name}
                    </p>
                    <p className="property-city">
                      {wishlistDetails[property].city}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="options-btn-container">
                <button
                  className=" btn-secondary"
                  onClick={(e) => removeWishlist(wishlistDetails[property].id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <>{toast.error("No Response Found")}</>
      )}
    </div>
  );
};

export default Wishlist;
