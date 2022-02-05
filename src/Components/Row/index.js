import React from "react";
import "./style.css";
import data from "../../properties.json";
import PropertyCard from "../PropertyCard";
import DisplayCard from "../DisplayCard";
const Row = ({ type }) => {
  return (
    //   Every row has a header followed by a divider line and then the cards content.
    <div className="row">
      {data.map((item, index) => {
        if (item.type === "imgCard") {
          return (
            <div key={index}>
              <h2 className="mobile-title">{item.title}</h2>
              <div className="propertycard-row">
                <DisplayCard title={item.title} data={item.cardDetails} />
              </div>
            </div>
          );
        }
        if (item.type === "propertyCard") {
          return (
            <>
              <h2 className="mobile-title">{item.title}</h2>
              <div className="propertycard-row">
                <PropertyCard title={item.title} data={item.cardDetails} />
              </div>
            </>
          );
        }
      })}
    </div>
  );
};

export default Row;
