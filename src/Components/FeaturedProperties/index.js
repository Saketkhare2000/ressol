import axios from "axios";
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../FeaturedProperties/style.css";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { WebContext } from "../../Context/WebContext";
import { FaCrown } from 'react-icons/fa';


const FeaturedProperties = () => {
  const [featuredPropertyList, setFeaturedPropertyList] = React.useState([]);
  const { base_url } = useContext(WebContext);
  useEffect(() => {
    axios
      .get(`${base_url}api/filter?prime=True&popular=True&expand=image`)
      .then((res) => {
        setFeaturedPropertyList(res.data);
      })
      .catch((err) => { });
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
