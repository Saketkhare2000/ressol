import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { pageSlide } from "../../Animation";
import { WebContext } from "../../Context/WebContext";
import Button from "../Button";
import Filter from "../Filter";
import "./style.css";
const Navbar = () => {
  const { filter, setFilter } = useContext(WebContext);
  //filter state

  return (
    <motion.header>
      {filter ? (
        <AnimatePresence>
          <Filter />
        </AnimatePresence>
      ) : (
        <nav className="navbar">
          <div className="top-header">
            <div className="logo">
              <Link to="/">Reessol</Link>
            </div>
            <Button title="Prime" variant="outline" />
          </div>
          <div className="search-bar">
            <motion.div onClick={() => setFilter(!filter)} className="input">
              Search for Locality, Town or City
            </motion.div>
          </div>
        </nav>
      )}
    </motion.header>
  );
};

export default Navbar;
