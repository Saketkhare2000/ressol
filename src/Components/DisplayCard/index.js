import React from "react";
import { Link } from "react-router-dom";
import { getPropertyList } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const DisplayCard = ({ title, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayProperties = (title) => {
    const city = title.toLowerCase();
    const data = { city: city }
    console.log(data)
    dispatch(getPropertyList(data)).then(() => {
      console.log("dispatched")
      navigate(`/propertylist/${city}`)
    }
    )
  }

  // {/* <Link className="displaycard" to={`/propertylist/${item.imgTitle}`} key={index}>
  //     <div key={index} className="displaycard-details">
  //       <img src={item.img} alt="" />
  //       <div className="overlay"></div>
  //       <p>{item.imgTitle}</p>
  //     </div>
  //   </Link> */}
  return data.map((item, index) => (
    <div className="displaycard" onClick={(e) => displayProperties(item.imgTitle)}>
      <div key={index} className="displaycard-details">
        <img src={item.img} alt="" />
        <div className="overlay"></div>
        <p>{item.imgTitle}</p>
      </div>
    </div>
  ));
};

export default DisplayCard;
