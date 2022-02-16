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
import Select from 'react-select'
import Multiselect from "multiselect-react-dropdown";
const Filter = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  // Common Filter States 
  const [propertyFor, setPropertyFor] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [minprice, setMinPrice] = React.useState(null);
  const [maxprice, setMaxPrice] = React.useState(null);
  const [property_type, setProperty_Type] = React.useState(null);

  // Specifications States
  const [bedrooms, setBedRooms] = React.useState(null);
  const [bathrooms, setBathrooms] = React.useState(null);
  const [possession_status, setPossession_Status] = React.useState(null);
  const [minarea, setMinArea] = React.useState(null);
  const [maxarea, setMaxArea] = React.useState(null);
  const [furnishing_status, setFurnishing_status] = React.useState(null);
  const [is_prime, setIs_Prime] = React.useState(false);
  const [floor, setFloor] = React.useState(null);

  /////////////////////////////////////////////////////////////////////////

  // Setting the filter values
  const data = {
    for: propertyFor,
    city: city,
    min: minprice,
    max: maxprice,
    minarea: minarea,
    maxarea: maxarea,
    type: property_type,
    bedrooms: bedrooms,
    bathrooms: bathrooms,
    possession: possession_status,
    furnishing: furnishing_status,
    prime: "True",
    floor: floor
  };

  ///////////////////////////////////////////////////////////////////////////////

  //  Select & Multi Select Dropdown Values 
  const cityOptions = cityData.map(city => {
    const { name } = city;
    return {
      value: name,
      label: name,
    }
  });
  const priceOptions = priceData.map(price => {
    const { value, label } = price;
    return {
      value: value,
      label: label,
    }
  });
  const areaOptions = areaData.map(area => {
    const { value, label } = area;
    return {
      value: value,
      label: label,
    }
  });
  const floorOptions = floorData.map(floor => {
    const { value, label } = floor;
    return {
      value: value,
      label: label,
    }
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
    const bedValue = []
    e.map(bedroom => {
      return bedValue.push(bedroom.value)
    })
    setBedRooms(bedValue)
  }
  const handleChangeBathrooms = (e) => {
    const bathroomValue = []
    console.log(e)
    e.map(bathroom => {
      return bathroomValue.push(bathroom.value)
    })
    setBathrooms(bathroomValue)
  }
  const handleChangeFurnishing = (e) => {
    const furnishingValue = []
    console.log(e)
    e.map(furnishing => {
      return furnishingValue.push(furnishing.value)
    })
    setFurnishing_status(furnishingValue)
  }
  const handleChangeFloor = (e) => {
    const floorValue = []
    console.log(e)
    e.map(floor => {
      return floorValue.push(floor.value)
    })
    setFloor(floorValue)
  }
  const handleChangeCity = (selectedOption) => {
    setCity(selectedOption.value.toLowerCase());
  }
  const handleChangeMinPrice = (selectedOption) => {
    setMinPrice(selectedOption.value);
  }
  const handleChangeMaxPrice = (selectedOption) => {
    setMaxPrice(selectedOption.value);
  }
  const handleChangeMinArea = (selectedOption) => {
    setMinArea(selectedOption.value);
  }
  const handleChangeMaxArea = (selectedOption) => {
    setMaxArea(selectedOption.value);
  }

  // Final Filter Search Handle Function
  const handleSearch = () => {
    console.log(data)
    dispatch(getPropertyList(data)).then(() => {
      console.log("dispatched")
      navigate(`/propertylist/filter-search`)
    }
    )

  }
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
          <div className="search" onClick={() => navigate('/')}>
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
                  <input onChange={(e) => setPropertyFor(e.target.value)} type="radio" name="for" id="for" value="sale" />
                  <label htmlFor="Buy">Buy</label>
                </div>
                <div className="select-option">
                  <input type="radio" name="for" id="for" value="rent" onChange={(e) => setPropertyFor(e.target.value)} />
                  <label htmlFor="Rent">Rent</label>
                </div>
                <div className="select-option">
                  <input onChange={(e) => setPropertyFor(e.target.value)} type="radio" name="for" id="for" value="pg" />
                  <label htmlFor="PG/Hostel">PG/Hostel</label>
                </div>
              </div>
            </div>
            <div className="filter-group">
              <h3>City</h3>
              <div className="filter-item">
                <Select width='100px' onChange={handleChangeCity} options={cityOptions} placeholder="City" openMenuOnClick={true} required />

              </div>
            </div>
            <div className="filter-group">
              <h3>Budget</h3>
              <div className="filter-item">
                <Select onChange={handleChangeMinPrice} placeholder="Min" options={priceOptions} required />
                <p>To</p>
                <Select onChange={handleChangeMaxPrice} placeholder="Max" options={priceOptions} required />
              </div>
            </div>
            <div className="filter-group">
              <h3>Property Type</h3>
              <div className="filter-item">
                <div className="select-option">
                  <input type="radio" onChange={(e) => setProperty_Type(e.target.value)} name="property_type" id="property_type" value="FL" />
                  <label htmlFor="property_type">Flat/Apartment</label>
                </div>
                <div className="select-option">
                  <input type="radio" onChange={(e) => setProperty_Type(e.target.value)} name="property_type" id="property_type" value="VI" />
                  <label htmlFor="property_type">Villa</label>
                </div>
                <div className="select-option">
                  <input type="radio" onChange={(e) => setProperty_Type(e.target.value)} name="property_type" id="property_type" value="CM" />
                  <label htmlFor="property_type">Commercial</label>
                </div>
                <div className="select-option">
                  <input type="radio" onChange={(e) => setProperty_Type(e.target.value)} name="property_type" id="property_type" value="PL" />
                  <label htmlFor="property_type">Plot</label>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------- */}

            {/* Changeable Specifications Section  */}
            <AnimatePresence>
              {(() => {
                // Flat/Apartment Property Type Filters 
                if (property_type === "FL") {
                  return (

                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", staggerChildren: 0.1 }}
                      exit={{ opacity: 0, y: -100 }}

                      className="specifications-section">
                      <h3 className="advanced-filters">Advanced Filters</h3>
                      {/* Bedrooms  */}
                      <div className="filter-group">
                        <h3>Bedrooms</h3>
                        <div className="filter-item">
                          <Select onChange={(e) => handleChangeBedrooms(e)} isMulti options={bedOptions} placeholder="Bedrooms" required />
                          {/* <Multiselect isObject={true} options={bedOptions}
                            displayValue="Number of Bedrooms" onSelect={(e) => console.log(e)} onRemove={(e) => console.log(e)} /> */}
                          {/* <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms((e.target.value))} name="bedrooms" id="1" value='1' />
                            <label htmlFor="bedrooms">1 BHK</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms(e.target.value)} name="bedrooms" id="2" value='2' />
                            <label htmlFor="bedrooms">2 BHK</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms(e.target.value)} name="bedrooms" id="3" value='3' />
                            <label htmlFor="bedrooms">3 BHK</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms(e.target.value)} name="bedrooms" id="4" value='4' />
                            <label htmlFor="bedrooms">4 BHK</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms(e.target.value)} name="bedrooms" id="5" value='5+' />
                            <label htmlFor="sale">5+ BHK</label>
                          </div> */}
                        </div>
                      </div>
                      {/* Bathrooms  */}
                      <div className="filter-group">
                        <h3>Bathrooms</h3>
                        <div className="filter-item">
                          <Select onChange={(e) => handleChangeBathrooms(e)} isMulti options={bathroomOptions} placeholder="Bathrooms" required />
                          {/* <div className="select-option">
                            <input type="radio" onChange={(e) => setBathrooms((e.target.value))} name="bathrooms" id="1" value='1' />
                            <label htmlFor="bathrooms">1</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="2" value='2' />
                            <label htmlFor="bathrooms">2</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="3" value='3' />
                            <label htmlFor="bathrooms">3</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="4" value='4+' />
                            <label htmlFor="bathrooms">4+</label>
                          </div> */}

                        </div>
                      </div>
                      {/* Possession Status  */}
                      <div className="filter-group">
                        <h3>Possession Status</h3>
                        <div className="filter-item">
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setPossession_Status((e.target.value))} name="possession_status" id="ready-to-move" value='Ready To Move' />
                            <label htmlFor="possession_status">Ready To Move</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setPossession_Status(e.target.value)} name="possession_status" id="under-construction" value='Under Construction' />
                            <label htmlFor="possession_status">Under Construction</label>
                          </div>

                        </div>
                      </div>
                      {/* Covered Area  */}
                      <div className="filter-group">
                        <h3>Covered Area (in sqft)</h3>
                        <div className="filter-item">
                          <Select onChange={handleChangeMinArea} placeholder="Min" options={areaOptions} required />
                          <p>To</p>
                          <Select onChange={handleChangeMaxArea} placeholder="Max" options={areaOptions} required />
                        </div>
                      </div>
                      {/* Furnishing Status  */}
                      <div className="filter-group">
                        <h3>Furnishing</h3>
                        <div className="filter-item">
                          <Select onChange={(e) => handleChangeFurnishing(e)} isMulti options={furnishingOptions} placeholder="Furnishing Status" required />

                          {/* <div className="select-option">
                            <input type="radio" onChange={(e) => setFurnishing_status((e.target.value))} name="furnishing_status" id="furnished" value='furnished' />
                            <label htmlFor="furnishing_status">Furnished</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="semifurnished" value='semifurnished' />
                            <label htmlFor="furnishing_status">Semi-Furnished</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="unfurnished" value='unfurnished' />
                            <label htmlFor="furnishing_status">Unfurnished</label>
                          </div> */}

                        </div>
                      </div>
                      {/* Floor Number  */}
                      <div className="filter-group">
                        <h3>Floor</h3>
                        <div className="filter-item">
                          <Select onChange={(e) => handleChangeFloor(e)} isMulti options={floorOptions} placeholder="Floor" required />
                        </div>
                      </div>
                      {/* Prime Property Checkbox  */}
                      <div className="filter-group">
                        <h3>Prime Property</h3>
                        <div className="filter-item">
                          <input type="checkbox" onChange={(e) => setIs_Prime(!is_prime)} name="prime_property" id="prime_property" />

                          <label htmlFor="prime_property">Yes</label>
                        </div>
                      </div>
                    </motion.div>
                  )
                }
                // House/Villa Property Type Filters 
                else if (property_type === "VI") {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", staggerChildren: 0.1 }}
                      exit={{ opacity: 0, y: -100 }}
                      className="specifications-section">
                      <h3 className="advanced-filters">Advanced Filters</h3>

                      {/* Bedrooms  */}
                      <div className="filter-group">
                        <h3>Test</h3>
                        <div className="filter-item">
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms((e.target.value))} name="bedrooms" id="1" value='1' />
                            <label htmlFor="bedrooms">1 BHK</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms(e.target.value)} name="bedrooms" id="2" value='2' />
                            <label htmlFor="bedrooms">2 BHK</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms(e.target.value)} name="bedrooms" id="3" value='3' />
                            <label htmlFor="bedrooms">3 BHK</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms(e.target.value)} name="bedrooms" id="4" value='4' />
                            <label htmlFor="bedrooms">4 BHK</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBedRooms(e.target.value)} name="bedrooms" id="5" value='5+' />
                            <label htmlFor="sale">5+ BHK</label>
                          </div>
                        </div>
                      </div>
                      {/* Bathrooms  */}
                      <div className="filter-group">
                        <h3>Test</h3>
                        <div className="filter-item">
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBathrooms((e.target.value))} name="bathrooms" id="1" value='1' />
                            <label htmlFor="bathrooms">1</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="2" value='2' />
                            <label htmlFor="bathrooms">2</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="3" value='3' />
                            <label htmlFor="bathrooms">3</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setBathrooms(e.target.value)} name="bathrooms" id="4" value='4+' />
                            <label htmlFor="bathrooms">4+</label>
                          </div>

                        </div>
                      </div>
                      {/* Possession Status  */}
                      <div className="filter-group">
                        <h3>Possession Status</h3>
                        <div className="filter-item">
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setPossession_Status((e.target.value))} name="possession_status" id="ready-to-move" value='Ready To Move' />
                            <label htmlFor="possession_status">Ready To Move</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setPossession_Status(e.target.value)} name="possession_status" id="under-construction" value='Under Construction' />
                            <label htmlFor="possession_status">Under Construction</label>
                          </div>

                        </div>
                      </div>
                      {/* Furnishing Status  */}
                      <div className="filter-group">
                        <h3>Furnishing</h3>
                        <div className="filter-item">
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setFurnishing_status((e.target.value))} name="furnishing_status" id="furnished" value='furnished' />
                            <label htmlFor="furnishing_status">Furnished</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="semifurnished" value='semifurnished' />
                            <label htmlFor="furnishing_status">Semi-Furnished</label>
                          </div>
                          <div className="select-option">
                            <input type="radio" onChange={(e) => setFurnishing_status(e.target.value)} name="furnishing_status" id="unfurnished" value='unfurnished' />
                            <label htmlFor="furnishing_status">Unfurnished</label>
                          </div>

                        </div>
                      </div>
                    </motion.div>
                  )
                } else {
                  return (
                    <div></div>

                  )
                }
              })()}
            </AnimatePresence>
            {/* Search Button  */}
            <button type="button" className="btn filter-btn" onClick={handleSearch}>Search Properties</button>
          </form>

        </motion.div>
      </motion.div >
    </AnimatePresence >
  );
};

export default Filter;
