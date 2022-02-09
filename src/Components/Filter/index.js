import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { WebContext } from "../../Context/WebContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button";
import data from "../../filters.json";
import { pageSlide } from "../../Animation";
const Filter = () => {
  const { filter, setFilter } = useContext(WebContext);
  return (
    <AnimatePresence>
      <motion.div
        variants={pageSlide}
        initial="show"
        animate="animate"
        exit="exit"
        className="filter-page"
      >
        <div className="filter-header">
          <div className="search" onClick={() => setFilter(!filter)}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <p>Search</p>
          </div>
        </div>
        <div className="filter-body">
          {data.map((item, index) => (
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
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Filter;
