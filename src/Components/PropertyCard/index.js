import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const PropertyCard = ({ title, data }) => {
  const location = useLocation();
  const [useData, setData] = React.useState();
  return data.map((item, index) => (
    <Link
      to="/property"
      state={{ from: "propertyCard" }}
      className="card"
      key={index}
      onClick={() => setData(item)}
    >
      <div key={index}>
        <div key={index} className="card-details">
          <p>{item.location}</p>
          <div className="img-container">
            <img src={item.img} alt="" />
          </div>
          <p>{item.price}</p>
        </div>
      </div>
    </Link>
  ));
};

export default PropertyCard;
