import React, { useContext, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPropertyList } from "../../actions/userActions";
import citydata from "../../homecities.json";
import servicetypedata from "../../typeofservice.json";
import { WebContext } from "../../Context/WebContext";
import Cookies from "js-cookie";
import axios from "axios";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { Link } from "react-router-dom";

const DisplayRow = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { base_url, paramsData, setParamsData } = useContext(WebContext);
  // Hard Coded Value of User's City 
  const city = "indore"
  const [cityProperties, setCityProperties] = React.useState([]);
  // ----------------------------------****---------------------------------////
  // const displayCityProperties = (title) => {
  //   const data = { city: title.toLowerCase(), expand: "image,posted_by.prime_status" };
  //   setParamsData(data);
  //   navigate(`/propertylist/${title}`)
  // };
  // ----------------------------------****---------------------------------////
  useEffect(() => {
    axios
      .get(`${base_url}api/filter?popular=True&city=${city}&expand=image`)
      .then((res) => {
        setCityProperties(res.data);
      })
      .catch((err) => { });
  }, []);
  console.log(cityProperties)
  function numDifferentiation(value) {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + " Cr";
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + " Lac";
    }
    return val;
  }

  const displayServiceProperties = (title) => {
    const data = { possession: title.toLowerCase(), expand: "image,posted_by.prime_status" };
    setParamsData(data);
    navigate(`/propertylist/${title}`);
  };
  return (
    <div className="row">
      <div className="card-row city-property">
        <h2 className="mobile-title">Explore Real Estate in <span className="city-name">{city}</span></h2>
        {/* <div className="propertycard-row">
          {citydata.map((item, index) => {
            return (
              <div
                className="displaycard"
                onClick={(e) => displayCityProperties(item.imgTitle)}
              >
                <div key={index} className="displaycard-details">
                  <img src={item.img} alt="" />
                  <div className="overlay"></div>
                  <p>{item.imgTitle}</p>
                </div>
              </div>
            );
          })}
        </div> */}
        <div className="featured-card-row">
          {cityProperties.slice(0, 5).map((item, index) => (
            <Link
              to={`/property/${item.id}`}
              className="card-details"
              key={index}
            >
              <div className="img-container">
                {item.image.length > 0 ? (
                  <img src={item.image[0].image.full_size} alt="" />
                ) : (
                  <img src={SamplePropertyImage} alt="" />
                )}
              </div>
              <p className="property-name">{item.property_name}</p>
              {/* <p className="property-prime">Prime Property</p> */}
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
      {/* Type of Service  */}
      <div className="card-row">
        <h2 className="mobile-title">Type of Service</h2>
        <div className="propertycard-row">
          {servicetypedata.map((item, index) => {
            return (
              <div
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
    </div>
  );
};

export default DisplayRow;
