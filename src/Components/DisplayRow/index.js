import React, { useContext, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPropertyList } from "../../actions/userActions";
import citydata from "../../homecities.json";
import servicetypedata from "../../typeofservice.json";
import latestPropertyData from "../../latestProperty.json";
import { WebContext } from "../../Context/WebContext";
import Cookies from "js-cookie";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
const DisplayRow = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { base_url, paramsData, setParamsData, loggedIn, phoneNumber } =
    useContext(WebContext);
  // Hard Coded Value of User's City
  const city = "indore";
  const [userId, setUserId] = React.useState([]);
  const [cityProperties, setCityProperties] = React.useState([]);
  const [wishlistStatus, setWishlistStatus] = React.useState(false);
  const [wishlistDetails, setWishlistDetails] = React.useState([]);

  // ----------------------------------****---------------------------------////
  const displayLocalityProperties = (title) => {
    const data = {
      location: title.toLowerCase(),
      expand: "image,posted_by.prime_status",
    };
    setParamsData(data);
    navigate(`/propertylist/${title}`);
  };
  // ----------------------------------****---------------------------------////
  useEffect(() => {
    axios
      .get(`${base_url}api/filter?popular=True&city=${city}&expand=image`)
      .then((res) => {
        setCityProperties(res.data);
      })
      .catch((err) => {});
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
        .catch((err) => {});
    } else {
      navigate("/login");
    }
  };

  const displayServiceProperties = (title) => {
    const data = {
      possession: title.toLowerCase(),
      expand: "image,posted_by.prime_status",
    };
    setParamsData(data);
    navigate(`/propertylist/${title}`);
  };
  const displayLatestProperties = (propertyType, typeTitle) => {
    const data = {
      type: propertyType,
      expand: "image,posted_by.prime_status",
    };
    setParamsData(data);
    navigate(`/propertylist/${typeTitle}`);
  };
  return (
    <div className="row">
      <div className="card-row city-property">
        <h2 className="mobile-title">
          Explore Real Estate in <span className="city-name">{city}</span>
        </h2>
        <div className="featured-card-row">
          {cityProperties.slice(0, 5).map((item, index) => (
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
              {/* <p className="property-prime">Prime Property</p> */}
              <p className="property-price">
                ₹ {numDifferentiation(item.price)}
              </p>
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
      <div className="card-row city-property">
        <h2 className="mobile-title">
          Properties in Top Localities
          <span className="city-name"> {city}</span>
        </h2>
        <Swiper
          modules={[Navigation]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          spaceBetween={30}
          slidesPerView={3}
          allowTouchMove={true}
          breakpoints={{
            // when window width is >= 640px
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            576: {
              width: 576,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
            992: {
              width: 992,
              slidesPerView: 3,
            },
          }}
        >
          <div className="propertycard-row">
            {citydata.map((item, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="displaycard"
                  onClick={() => displayLocalityProperties(item.imgTitle)}
                >
                  <div key={index} className="displaycard-details">
                    <img src={item.img} alt="" />
                    <div className="overlay"></div>
                    <p>{item.imgTitle}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
      {/* Type of Service  */}
      <div className="card-row">
        <h2 className="mobile-title">Type of Service</h2>
        <div className="propertycard-row">
          {servicetypedata.map((item, index) => {
            return (
              <div
                key={index}
                className="displaycard"
                onClick={(e) => displayServiceProperties(item.imgTitle)}
              >
                <div key={index} className="displaycard-details">
                  <img src={item.img} alt="" />
                  <div className="overlay"></div>
                  <p>{item.imgTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Latest Projects  */}
      <div className="card-row">
        <h2 className="mobile-title">Latest Projects</h2>
        <div className="propertycard-row">
          {latestPropertyData.map((item, index) => {
            return (
              <div
                key={index}
                className="displaycard"
                onClick={(e) =>
                  displayLatestProperties(item.query, item.imgTitle)
                }
              >
                <div key={index} className="displaycard-details">
                  <img src={item.img} alt="" />
                  <div className="overlay"></div>
                  <p>{item.imgTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DisplayRow;
