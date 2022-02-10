import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { WebContext } from "../../Context/WebContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import cityData from "../../cities.json";
import priceData from "../../prices.json";
import Select from 'react-select'
const Filter = () => {
  const navigate = useNavigate()
  const { filter, setFilter } = useContext(WebContext);

  const [city, setCity] = React.useState("");
  const [minprice, setMinPrice] = React.useState("");
  const [maxprice, setMaxPrice] = React.useState("");

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

  const handleChangeCity = (selectedOption) => {
    setCity(selectedOption.value);
  }
  const handleChangeMinPrice = (selectedOption) => {
    setMinPrice(selectedOption.value);
  }
  const handleChangeMaxPrice = (selectedOption) => {
    setMaxPrice(selectedOption.value);
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", staggerChildren: 0.1 }}
        exit={{ opacity: 0, y: -100 }}
        className="filter-page"
      >
        <motion.div className="filter-header">
          <div className="search" onClick={() => navigate('/')}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <p>Filters</p>
          </div>
        </motion.div>
        <motion.div className="filter-body">
          <form action="">
            <div className="filter-group">
              <h3>Property For</h3>
              <div className="filter-item">
                <div className="select-option">
                  <input type="radio" name="for" id="for" value="Buy" />
                  <label htmlFor="Buy">Buy</label>
                </div>
                <div className="select-option">
                  <input type="radio" name="for" id="for" value="Rent" />
                  <label htmlFor="Rent">Rent</label>
                </div>
                <div className="select-option">
                  <input type="radio" name="for" id="for" value="PG/Hostel" />
                  <label htmlFor="PG/Hostel">PG/Hostel</label>
                </div>
              </div>
            </div>
            <div className="filter-group">
              <h3>City</h3>
              <div className="filter-item">
                <Select onChange={handleChangeCity} options={cityOptions} openMenuOnClick={false} required />

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

              </div>
            </div>
          </form>
          {/* {data.map((item, index) => (
            <div key={index} className="filters">
              <div className="filter">
                <div className="filter-title">
                  <p>{item.title}</p>
                </div>
                <div className="filter-items">
                  {item.filterItem.map((item, key) => (
                    <Button key={key} title={item} variant={"secondary"} />
                  ))}
                </div>
              </div>
            </div>
          ))} */}
        </motion.div>
      </motion.div >
    </AnimatePresence >
  );
};

export default Filter;
