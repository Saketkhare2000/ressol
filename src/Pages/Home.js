import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { slideUp } from "../Animation";
import "../Styles/home.css"
import AdBanner from "../Components/AdBanner";
// import ExploreCity from "../Components/ExploreCity";
import DisplayRow from "../Components/DisplayRow";
import FeaturedProperties from "../Components/FeaturedProperties";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate()
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key="pageSlide"
        initial="show"
        exit="exit"
        animate="animate"
        variants={slideUp}
        className="page home-page"
      >
        <div className="search-bar">
          <motion.div onClick={() => navigate("/filter")} className="input">
            <FiSearch />
            Search for Properties
          </motion.div>
        </div>
        <DisplayRow />
        <FeaturedProperties />
        {/* <AdBanner /> */}
        {/* <ExploreCity /> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
