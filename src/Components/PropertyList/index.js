import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../Loader";
import "./style.css";
import { motion } from "framer-motion";
const PropertyDeatiledCard = () => {
  const navigate = useNavigate();
  const result = useParams().slug.toLowerCase();
  const propertyList = useSelector((state) => state.propertyList.propertyData);
  function numDifferentiation(value) {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + " Cr";
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + " Lac";
    }
    return val;
  }
  //cardData state
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
    >
      <div className="back property-list-back" onClick={() => navigate("/")}>
        <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        <h1 className="mobile-title">
          Properties <span className="city-name"> ({result}) </span>
        </h1>
        {/* <p>Go Back</p> */}
      </div>
      {propertyList ? (
        Object.keys(propertyList).map((property, index) => {
          return (
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
                    } else if (propertyList[property].property_type === "VI") {
                      return <p className="property-type">House</p>;
                    } else if (propertyList[property].property_type === "PT") {
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
                <div className="property-detail-btn-container">
                  <button className="btn btn-primary">Contact Agent</button>
                  <button className="btn btn-secondary">Add To Wishlist</button>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <Loader />
      )}
    </motion.div>
  );
};

export default PropertyDeatiledCard;
