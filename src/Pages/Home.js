import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/global.css";

const Home = () => {
  return (
    <div className="page">
      <h1>Hello</h1>
      <FontAwesomeIcon icon={["fab", "github"]} />
    </div>
  );
};

export default Home;
