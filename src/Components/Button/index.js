import React from "react";
import "./style.css";
import { motion } from "framer-motion";
const Button = ({ title, variant }) => {
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        className={`btn btn-${variant}`}
      >
        <p>{title}</p>
      </motion.button>
    </>
  );
};

export default Button;
