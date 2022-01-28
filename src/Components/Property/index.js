import React from "react";
import { useLocation } from "react-router-dom";

const Property = () => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  return (
    <div className="page">
      <h1>Property</h1>
      {console.log(location.state)}
    </div>
  );
};

export default Property;
