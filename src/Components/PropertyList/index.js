import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPropertyList } from "../../actions/userActions";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Loader from "../Loader";
import "./style.css";
import { motion, AnimatePresence } from "framer-motion";
const PropertyDeatiledCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const result = (useParams().slug).toLowerCase();
  console.log(result)
  const propertyList = useSelector(state => state.propertyList.propertyData);
  console.log(propertyList)
  // const data = { city: city }
  // console.log(city)
  // useEffect(() => {
  //   dispatch(getPropertyList(data))
  // }, []);
  // useEffect(() => {
  //   console.log(propertyList)
  // }, [])
  function numDifferentiation(value) {
    var val = Math.abs(value)
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + ' Cr';
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + ' Lac';
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

      <div className="back" onClick={() => navigate('/')}>
        <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        <h1 className="mobile-title">Properties <span className="city-name"> ({result}) </span></h1>
        {/* <p>Go Back</p> */}
      </div>
      {
        propertyList ? Object.keys(propertyList).map((property, index) => {
          return (
            <AnimatePresence>
              <Link to={`/property/${propertyList[property].id}`}>
                <div key={index} className="property-detail-card">
                  <div className="img-container">
                    {
                      propertyList[property].image.length > 0 ?
                        <img src={propertyList[property].image[0].image.full_size} alt="" />
                        :
                        <img src={SamplePropertyImage} alt="" />
                    }

                  </div>
                  <div className="property-detail-card-details">
                    <p className="property-price">₹ {numDifferentiation(propertyList[property].price)}</p>
                    <p className="property-name">
                      {propertyList[property].property_name}
                    </p>
                    {/* <p className="property-type">
                      {propertyList[property].property_type}
                    </p> */}
                    {(() => {
                      if (propertyList[property].property_type === "FL") {
                        return (
                          <p className="property-type">
                            Flat
                          </p>
                        )
                      } else if (propertyList[property].property_type === "VI") {
                        return (
                          <p className="property-type">
                            House
                          </p>

                        )
                      }
                      else if (propertyList[property].property_type === "PT") {
                        return (
                          <p className="property-type">
                            Plot
                          </p>

                        )
                      }

                      else {
                        return (
                          <p className="property-type">
                            Commercial
                          </p>
                        )
                      }
                    })()}
                    <p className="property-city">
                      {propertyList[property].location}, {propertyList[property].city}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimatePresence>
          );
        }) : <Loader />
      }
    </motion.div>
  );
};

export default PropertyDeatiledCard;
