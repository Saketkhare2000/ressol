import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { slideUp } from "../Animation";
import Row from "../Components/Row";

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
        <Row />
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
