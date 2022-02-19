import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { getPropertyList } from "../../actions/userActions";
import { WebContext } from "../../Context/WebContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import cityData from "../../cities.json";
import priceData from "../../prices.json";
import areaData from "../../area.json";
import floorData from "../../floor.json";
import amenitiesData from "../../amenities.json";

import Select from "react-select";
const Filter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Common Filter States
  const [propertyFor, setPropertyFor] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [minprice, setMinPrice] = React.useState(null);
  const [maxprice, setMaxPrice] = React.useState(null);
  const [property_type, setProperty_Type] = React.useState(null);
  const [propertyName, setPropertyName] = React.useState(null);
  // Specifications States
  const [bedrooms, setBedRooms] = React.useState(null);
  const [bathrooms, setBathrooms] = React.useState(null);
  const [possession_status, setPossession_Status] = React.useState(null);
  const [minarea, setMinArea] = React.useState(null);
  const [maxarea, setMaxArea] = React.useState(null);
  const [furnishing_status, setFurnishing_status] = React.useState(null);
  const [is_prime, setIs_Prime] = React.useState(null);
  const [cornerPlot, setCornerPlot] = React.useState(null);
  const [gatedCommunity, setGatedCommunity] = React.useState(null);
  const [floor, setFloor] = React.useState(null);
  const [amenities, setAmenities] = useState(null);

  /////////////////////////////////////////////////////////////////////////

  // Setting the filter values
  const data = {
    for: propertyFor,
    city: city,
    min: minprice,
    max: maxprice,
    property_name: propertyName,
    minarea: minarea,
    maxarea: maxarea,
    type: property_type,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    possession: possession_status,
    furnishing: furnishing_status,
    prime: is_prime,
    floor: floor,
    corner: cornerPlot,
    gated: gatedCommunity,
    amenities: amenities,
    expand: "image",
  };

  ///////////////////////////////////////////////////////////////////////////////

  //  Select & Multi Select Dropdown Values
  const cityOptions = cityData.map((city) => {
    const { name } = city;
    return {
      value: name,
      label: name,
    };
  });
  const priceOptions = priceData.map((price) => {
    const { value, label } = price;
    return {
      value: value,
      label: label,
    };
  });
  const areaOptions = areaData.map((area) => {
    const { value, label } = area;
    return {
      value: value,
      label: label,
    };
  });
  const floorOptions = floorData.map((floor) => {
    const { value, label } = floor;
    return {
      value: value,
      label: label,
    };
  });
  const amenitiesOptions = amenitiesData.map((amenities) => {
    const { value, label } = amenities;
    return {
      value: value,
      label: label,
    };
  });
  const bedData = [
    { value: "1", label: "1 BHK" },
    { value: "2", label: "2 BHK" },
    { value: "3", label: "3 BHK" },
    { value: "4", label: "4 BHK" },
    { value: "5+", label: "5+ BHK" },
  ];
  const [bedOptions] = React.useState(bedData);
  const bathroomData = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4+", label: "4+" },
  ];
  const [bathroomOptions] = React.useState(bathroomData);
  const furnishingData = [
    { value: "furnished", label: "Furnished" },
    { value: "semifurnished", label: "Semi-Furnished" },
    { value: "unfurnished", label: "Unfurnished" },
  ];
  const [furnishingOptions] = React.useState(furnishingData);

  /////////////////////////////////////////////////////////////////////////////

  // Select & Multi Select Dropdown Handle Functions

  const handleChangeBedrooms = (e) => {
    const bedValue = [];
    e.map((bedroom) => {
      return bedValue.push(bedroom.value);
    });
    setBedRooms(bedValue);
  };
  const handleChangeBathrooms = (e) => {
    const bathroomValue = [];
    console.log(e);
    e.map((bathroom) => {
      return bathroomValue.push(bathroom.value);
    });
    setBathrooms(bathroomValue);
  };
  const handleChangeFurnishing = (e) => {
    const furnishingValue = [];
    console.log(e);
    e.map((furnishing) => {
      return furnishingValue.push(furnishing.value);
    });
    setFurnishing_status(furnishingValue);
  };
  const handleChangeFloor = (e) => {
    const floorValue = [];
    console.log(e);
    e.map((floor) => {
      return floorValue.push(floor.value);
    });
    setFloor(floorValue);
  };
  const handleAmenities = (e) => {
    const amenitiesValue = [];
    e.map((amenities) => {
      return amenitiesValue.push(amenities.value);
    });
    setAmenities(amenitiesValue);
  };
  const handleChangeCity = (selectedOption) => {
    setCity(selectedOption.value.toLowerCase());
  };
  const handleChangeMinPrice = (selectedOption) => {
    setMinPrice(selectedOption.value);
  };
  const handleChangeMaxPrice = (selectedOption) => {
    setMaxPrice(selectedOption.value);
  };
  const handleChangeMinArea = (selectedOption) => {
    setMinArea(selectedOption.value);
  };
  const handleChangeMaxArea = (selectedOption) => {
    setMaxArea(selectedOption.value);
  };
  const handleIsPrime = (e) => {
    if (e.target.checked) {
      setIs_Prime("True");
    } else {
      setIs_Prime("False");
    }
  };
  const handleCornerPlot = (e) => {
    if (e.target.checked) {
      setCornerPlot("True");
    } else {
      setCornerPlot("False");
    }
  };
  const handleGatedCommunity = (e) => {
    if (e.target.checked) {
      setGatedCommunity("True");
    } else {
      setGatedCommunity("False");
    }
  };

  // Final Filter Search Handle Function
  const handleSearch = () => {
    console.log(data);
    dispatch(getPropertyList(data)).then(() => {
      console.log("dispatched");
      navigate(`/propertylist/results`);
    });
  };
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", staggerChildren: 0.1 }}
        exit={{ opacity: 0, y: -100 }}
        className="filter-page page"
      >
        <motion.div className="filter-header">
          <div className="search" onClick={() => navigate("/")}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <p>Filters</p>
          </div>
        </motion.div>
        <motion.div className="filter-body">
          <form action="">
            {/* Common Filters  */}
            <div className="filter-group">
              <h3>Property For</h3>
              <div className="filter-item">
                <div className="select-option">
                  <input
                    onChange={(e) => setPropertyFor(e.target.value)}
                    type="radio"
                    name="for"
                    id="for"
                    value="sale"
                  />
                  <label htmlFor="Buy">Buy</label>
                </div>
                <div className="select-option">
                  <input
                    type="radio"
                    name="for"
                    id="for"
                    value="rent"
                    onChange={(e) => setPropertyFor(e.target.value)}
                  />
                  <label htmlFor="Rent">Rent</label>
                </div>
                {/* <div className="select-option">
                  <input onChange={(e) => setPropertyFor(e.target.value)} type="radio" name="for" id="for" value="pg" />
                  <label htmlFor="PG/Hostel">PG/Hostel</label>
                </div> */}
              </div>
            </div>
            <div className="filter-group">
              <h3>City</h3>
              <div className="filter-item">
                <Select
                  width="100px"
                  onChange={handleChangeCity}
                  options={cityOptions}
                  placeholder="City"
                  openMenuOnClick={true}
                  required
                />
              </div>
            </div>
            <div className="filter-group">
              <h3>Budget</h3>
              <div className="filter-item">
                <Select
                  onChange={handleChangeMinPrice}
                  placeholder="Min"
                  options={priceOptions}
                  required
                />
                <p>To</p>
                <Select
                  onChange={handleChangeMaxPrice}
                  placeholder="Max"
                  options={priceOptions}
                  required
                />
              </div>
            </div>
            <div className="filter-group">
              <h3>Property Name</h3>
              <div className="filter-item">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setPropertyName(e.target.value)}
                  placeholder="Property/Project Name"
                />
              </div>
            </div>
            <div className="filter-group">
              <h3>Property Type</h3>
              <div className="filter-item">
                <div className="select-option">
                  <input
                    type="radio"
                    onChange={(e) => setProperty_Type(e.target.value)}
                    name="property_type"
                    id="property_type"
                    value="FL"
                  />
                  <label htmlFor="property_type">Flat</label>
                </div>
                <div className="select-option">
                  <input
                    type="radio"
                    onChange={(e) => setProperty_Type(e.target.value)}
                    name="property_type"
                    id="property_type"
                    value="VI"
                  />
                  <label htmlFor="property_type">House/Villa</label>
                </div>
                <div className="select-option">
                  <input
                    type="radio"
                    onChange={(e) => setProperty_Type(e.target.value)}
                    name="property_type"
                    id="property_type"
                    value="PT"
                  />
                  <label htmlFor="property_type">Plot</label>
                </div>
                <div className="select-option">
                  <input
                    type="radio"
                    onChange={(e) => setProperty_Type(e.target.value)}
                    name="property_type"
                    id="property_type"
                    value="CM"
                  />
                  <label htmlFor="property_type">Commercial</label>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------- */}

            {/* Changeable Specifications Section  */}
            <AnimatePresence>
              {(() => {
                // Flat/Apartment Property Type Filters
                if (property_type === "FL" || property_type === "VI") {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        staggerChildren: 0.1,
                      }}
                      exit={{ opacity: 0, y: -100 }}
                      className="specifications-section"
                    >
                      <h3 className="advanced-filters">Advanced Filters</h3>
                      {/* Bedrooms  */}
                      <div className="filter-group">
                        <h3>Bedrooms</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleChangeBedrooms(e)}
                            closeMenuOnSelect={false}
                            isMulti
                            options={bedOptions}
                            placeholder="Bedrooms"
                            required
                          />
                        </div>
                      </div>
                      {/* Bathrooms  */}
                      <div className="filter-group">
                        <h3>Bathrooms</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleChangeBathrooms(e)}
                            closeMenuOnSelect={false}
                            isMulti
                            options={bathroomOptions}
                            placeholder="Bathrooms"
                            required
                          />
                        </div>
                      </div>
                      {/* Possession Status  */}
                      <div className="filter-group">
                        <h3>Possession Status</h3>
                        <div className="filter-item">
                          <div className="select-option">
                            <input
                              type="radio"
                              onChange={(e) =>
                                setPossession_Status(e.target.value)
                              }
                              name="possession_status"
                              id="ready-to-move"
                              value="ready to move"
                            />
                            <label htmlFor="possession_status">
                              Ready To Move
                            </label>
                          </div>
                          <div className="select-option">
                            <input
                              type="radio"
                              onChange={(e) =>
                                setPossession_Status(e.target.value)
                              }
                              name="possession_status"
                              id="under-construction"
                              value="under construction"
                            />
                            <label htmlFor="possession_status">
                              Under Construction
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* Covered Area  */}
                      <div className="filter-group">
                        <h3>Covered Area (in sqft)</h3>
                        <div className="filter-item">
                          <Select
                            onChange={handleChangeMinArea}
                            placeholder="Min"
                            options={areaOptions}
                            required
                          />
                          <p>To</p>
                          <Select
                            onChange={handleChangeMaxArea}
                            placeholder="Max"
                            options={areaOptions}
                            required
                          />
                        </div>
                      </div>
                      {/* Furnishing Status  */}
                      <div className="filter-group">
                        <h3>Furnishing</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleChangeFurnishing(e)}
                            closeMenuOnSelect={false}
                            isMulti
                            options={furnishingOptions}
                            placeholder="Furnishing Status"
                            required
                          />
                        </div>
                      </div>
                      {/* Floor Number  */}
                      <div className="filter-group">
                        <h3>Floor</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleChangeFloor(e)}
                            closeMenuOnSelect={false}
                            isMulti
                            options={floorOptions}
                            placeholder="Floor"
                            required
                          />
                        </div>
                      </div>
                      {/* Amenities  */}
                      <div className="filter-group">
                        <h3>Amenities</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleAmenities(e)}
                            closeMenuOnSelect={false}
                            isMulti
                            options={amenitiesOptions}
                            placeholder="Amenities Available"
                            required
                          />
                        </div>
                      </div>
                      {/* Prime Property Checkbox  */}
                      <div className="filter-group">
                        <h3>Show Prime Property</h3>
                        <div className="filter-item">
                          <input
                            type="checkbox"
                            onChange={handleIsPrime}
                            name="prime_property"
                            id="prime_property"
                          />
                          <label htmlFor="prime_property">Yes</label>
                        </div>
                      </div>
                    </motion.div>
                  );
                } else if (property_type === "PT") {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        staggerChildren: 0.1,
                      }}
                      exit={{ opacity: 0, y: -100 }}
                      className="specifications-section"
                    >
                      <h3 className="advanced-filters">Advanced Filters</h3>
                      {/* Covered Area  */}
                      <div className="filter-group">
                        <h3>Covered Area (in sqft)</h3>
                        <div className="filter-item">
                          <Select
                            onChange={handleChangeMinArea}
                            placeholder="Min"
                            options={areaOptions}
                            required
                          />
                          <p>To</p>
                          <Select
                            onChange={handleChangeMaxArea}
                            placeholder="Max"
                            options={areaOptions}
                            required
                          />
                        </div>
                      </div>
                      {/* Corner Plot Checkbox  */}
                      <div className="filter-group">
                        <h3>Corner Plot</h3>
                        <div className="filter-item">
                          <input
                            type="checkbox"
                            onChange={handleCornerPlot}
                            name="corner_plot"
                            id="corner_plot"
                          />
                          <label htmlFor="corner_plot">Corner Plot</label>
                        </div>
                      </div>
                      {/* Gated Community Checkbox  */}
                      <div className="filter-group">
                        <h3>Gated Community</h3>
                        <div className="filter-item">
                          <input
                            type="checkbox"
                            onChange={handleGatedCommunity}
                            name="gated_community"
                            id="gated_community"
                          />
                          <label htmlFor="corner_plot">Gated Community</label>
                        </div>
                      </div>
                      {/* Prime Property Checkbox  */}
                      <div className="filter-group">
                        <h3>Show Prime Property</h3>
                        <div className="filter-item">
                          <input
                            type="checkbox"
                            onChange={handleIsPrime}
                            name="prime_property"
                            id="prime_property"
                          />
                          <label htmlFor="prime_property">Yes</label>
                        </div>
                      </div>
                    </motion.div>
                  );
                } else if (property_type === "CM") {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        staggerChildren: 0.1,
                      }}
                      exit={{ opacity: 0, y: -100 }}
                      className="specifications-section"
                    >
                      <h3 className="advanced-filters">Advanced Filters</h3>
                      {/* Covered Area  */}
                      <div className="filter-group">
                        <h3>Covered Area (in sqft)</h3>
                        <div className="filter-item">
                          <Select
                            onChange={handleChangeMinArea}
                            placeholder="Min"
                            options={areaOptions}
                            required
                          />
                          <p>To</p>
                          <Select
                            onChange={handleChangeMaxArea}
                            placeholder="Max"
                            options={areaOptions}
                            required
                          />
                        </div>
                      </div>

                      {/* Possession Status  */}
                      <div className="filter-group">
                        <h3>Possession Status</h3>
                        <div className="filter-item">
                          <div className="select-option">
                            <input
                              type="radio"
                              onChange={(e) =>
                                setPossession_Status(e.target.value)
                              }
                              name="possession_status"
                              id="ready-to-move"
                              value="ready to move"
                            />
                            <label htmlFor="possession_status">
                              Ready To Move
                            </label>
                          </div>
                          <div className="select-option">
                            <input
                              type="radio"
                              onChange={(e) =>
                                setPossession_Status(e.target.value)
                              }
                              name="possession_status"
                              id="under-construction"
                              value="under construction"
                            />
                            <label htmlFor="possession_status">
                              Under Construction
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* Bathrooms  */}
                      <div className="filter-group">
                        <h3>Washrooms</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleChangeBathrooms(e)}
                            closeMenuOnSelect={false}
                            isMulti
                            options={bathroomOptions}
                            placeholder="Washrooms"
                            required
                          />
                        </div>
                      </div>
                      {/* Furnishing Status  */}
                      <div className="filter-group">
                        <h3>Furnishing</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleChangeFurnishing(e)}
                            closeMenuOnSelect={false}
                            isMulti
                            options={furnishingOptions}
                            placeholder="Furnishing Status"
                            required
                          />
                        </div>
                      </div>
                      {/* Floor Number  */}
                      <div className="filter-group">
                        <h3>Floor</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleChangeFloor(e)}
                            closeMenuOnSelect={false}
                            isMulti
                            options={floorOptions}
                            placeholder="Floor"
                            required
                          />
                        </div>
                      </div>
                      {/* Amenities  */}
                      <div className="filter-group">
                        <h3>Amenities</h3>
                        <div className="filter-item">
                          <Select
                            onChange={(e) => handleAmenities(e)}
                            isMulti
                            options={amenitiesOptions}
                            placeholder="Amenities Available"
                            required
                          />
                        </div>
                      </div>
                      {/* Prime Property Checkbox  */}
                      <div className="filter-group">
                        <h3>Show Prime Property</h3>
                        <div className="filter-item">
                          <input
                            type="checkbox"
                            onChange={handleIsPrime}
                            name="prime_property"
                            id="prime_property"
                          />
                          <label htmlFor="prime_property">Yes</label>
                        </div>
                      </div>
                    </motion.div>
                  );
                } else {
                  return <></>;
                }
              })()}
            </AnimatePresence>
            {/* Search Button  */}
            <button
              type="button"
              className="btn filter-btn"
              onClick={handleSearch}
            >
              Search Properties
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Filter;
