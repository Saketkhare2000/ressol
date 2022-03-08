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
  const { base_url, loggedIn, phoneNumber } = useContext(WebContext);
  useEffect(() => {
    dispatch(getUserData(phoneNumber, base_url));
  }, []);

  const userDetails = useSelector((state) => state.userData.userData);
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

  useEffect(() => {
    if (loggedIn) {
      axios({
        method: "get",
        url: `${base_url}api/profile/${phoneNumber}/?expand=wishlist.image`,
      }).then((res) => {
        setWishlistDetails(res.data.wishlist);
      });
    }
  }, []);

  const removeWishlist = (id, base_url) => {
    axios({
      method: "post",
      url: `http://localhost:8000/api/wish`,
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
