import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { slideUp } from "../Animation";
import "../Styles/home.css";
import AdBanner from "../Components/AdBanner";
// import ExploreCity from "../Components/ExploreCity";
import DisplayRow from "../Components/DisplayRow";
import FeaturedProperties from "../Components/FeaturedProperties";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if (reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, [])
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
            Search for Properties
            <FiSearch />
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
