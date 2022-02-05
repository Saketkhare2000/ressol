import { motion } from "framer-motion";
import React from "react";
import { slideUp } from "../Animation";
import PropertyDeatiledCard from "../Components/PropertyList";

const PropertyList = () => {
  return (
    <>
      <motion.div
        initial="show"
        animate="animate"
        exit="hide"
        variants={slideUp}
        className="page"
      >
        <PropertyDeatiledCard />
      </motion.div>
    </>
  );
};

export default PropertyList;
