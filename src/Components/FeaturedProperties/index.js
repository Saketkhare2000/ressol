import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import "../FeaturedProperties/style.css";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { WebContext } from "../../Context/WebContext";
import { FaCrown } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";


const FeaturedProperties = () => {
  const navigate = useNavigate();

  const [featuredPropertyList, setFeaturedPropertyList] = React.useState([]);
  const { base_url, loggedIn, phoneNumber } = useContext(WebContext);
  const [userId, setUserId] = React.useState([]);
  const [wishlistStatus, setWishlistStatus] = React.useState(false);
  const [wishlistDetails, setWishlistDetails] = React.useState([]);
  useEffect(() => {
    axios
      .get(`${base_url}api/filter?prime=True&popular=True&expand=image`)
      .then((res) => {
        setFeaturedPropertyList(res.data);
      })
      .catch((err) => { });
    if (loggedIn) {
      axios({
        method: "get",
        url: `${base_url}api/profile/${phoneNumber}/`,
      }).then((res) => {
        setUserId(res.data.id);
        setWishlistDetails(res.data.wishlist);
      });
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
  const handleWishlist = (e, propertyid) => {
    e.preventDefault();
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
  return (
    <div className="card-row">
      <h2 className="mobile-title">Featured Properties <span>( <FaCrown /> By Prime Agents)</span> </h2>
      <div className="featured-card-row">
        {featuredPropertyList.slice(0, 5).map((item, index) => (
          <Link
            to={`/property/${item.id}`}
            className="card-details"
            key={index}
          >
            {wishlistDetails.find((data) => data == item.id) === item.id ? (
              <div
                className="wishlist-btn"
                onClick={(e) => {
                  handleWishlist(e, item.id);
                  setWishlistDetails((oldList) => [
                    ...oldList.filter((data) => data != item.id),
                  ]);
                }}
              >
                <AiFillHeart style={{ fontSize: "20px" }} />
              </div>
            ) : (
              <div
                className="wishlist-btn"
                onClick={(e) => {
                  handleWishlist(e, item.id);
                  setWishlistDetails((oldList) => [...oldList, item.id]);
                }}
              >
                <AiOutlineHeart style={{ fontSize: "20px" }} />
              </div>
            )}
            <div className="img-container">
              {item.image.length > 0 ? (
                <img src={item.image[0].image.full_size} alt="" />
              ) : (
                <img src={SamplePropertyImage} alt="" />
              )}
            </div>
            <p className="property-name">{item.property_name}</p>
            <p className="property-prime"><FaCrown />Prime Verified</p>
            <p className="property-price">₹ {numDifferentiation(item.price)}</p>
            <p className="property-type">
              {(() => {
                if (item.property_type === "FL") {
                  return <>Flat</>;
                } else if (item.property_type === "VI") {
                  return <>House</>;
                } else if (item.property_type === "PT") {
                  return <>Plot</>;
                } else {
                  return <>Commercial</>;
                }
              })()}
            </p>
            <p className="property-location">
              {item.location} | {item.city}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
