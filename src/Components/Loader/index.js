import React from "react";
import { CgSpinner } from "react-icons/cg";
import "./style.css";
const Loader = () => {
  return (
    <section className="loader">
      <CgSpinner className="spin" />
    </section>
  );
};

export default Loader;
