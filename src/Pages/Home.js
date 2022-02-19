import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { slideUp } from "../Animation";
import AdBanner from "../Components/AdBanner";
// import ExploreCity from "../Components/ExploreCity";
import DisplayRow from "../Components/DisplayRow";
import FeaturedProperties from "../Components/FeaturedProperties";

const Home = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key="pageSlide"
        initial="show"
        exit="exit"
        animate="animate"
        variants={slideUp}
        className="page"
      >
        <DisplayRow />
        <FeaturedProperties />
        {/* <AdBanner /> */}
        {/* <ExploreCity /> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
