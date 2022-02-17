import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyList } from "../../actions/userActions";

// import data from "../../properties.json";
import citydata from "../../homecities.json"
import servicetypedata from "../../typeofservice.json"
import DisplayCard from "../DisplayCard";

const DisplayRow = ({ type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayCityProperties = (title) => {

    const data = { city: title.toLowerCase() }
    console.log(data)
    dispatch(getPropertyList(data)).then(() => {
      console.log("dispatched")
      navigate(`/propertylist/${title}`)
    }
    )
  }
  const displayServiceProperties = (title) => {

    const data = { possession: title.toLowerCase() }
    console.log(data)
    dispatch(getPropertyList(data)).then(() => {
      console.log("dispatched")
      navigate(`/propertylist/${title}`)
    }
    )
  }
  return (
    //   Every row has a header followed by a divider line and then the cards content.
    <div className="row">

      {/* City Data  */}
      <div className="card-row">
        <h2 className="mobile-title">Explore Real Estate in your City</h2>
        <div className="propertycard-row">
          {
            citydata.map((item, index) => {
              return (
                <div className="displaycard" onClick={(e) => displayCityProperties(item.imgTitle)}>
                  <div key={index} className="displaycard-details">
                    <img src={item.img} alt="" />
                    <div className="overlay"></div>
                    <p>{item.imgTitle}</p>
                  </div>
                </div>
              );
            }
            )
          }
        </div>
      </div>
      {/* Type of Service  */}
      <div className="card-row">
        <h2 className="mobile-title">Type of Service</h2>
        <div className="propertycard-row">
          {
            servicetypedata.map((item, index) => {
              return (
                <div className="displaycard" onClick={(e) => displayServiceProperties(item.imgTitle)}>
                  <div key={index} className="displaycard-details">
                    <img src={item.img} alt="" />
                    <div className="overlay"></div>
                    <p>{item.imgTitle}</p>
                  </div>
                </div>
              );
            }
            )
          }
        </div>
      </div>
    </div>
  );
};

export default DisplayRow;
// /* {data.map((item, index) => {
//         if (item.type === "imgCard") {
//           return (
//             <div className="card-row" key={index}>
//               <h2 className="mobile-title">{item.title}</h2>
//               <div className="propertycard-row">
//                 <DisplayCard title={item.title} data={item.cardDetails} />
//               </div>
//             </div>
//           );
//         }
//       })} */