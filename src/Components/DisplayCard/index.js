import React from "react";
import { Link } from "react-router-dom";
import { getPropertyList } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const DisplayCard = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [city, setCity] = React.useState(null);
  const [possessionStatus, setPossessionStatus] = React.useState(null);
  const displayProperties = (title) => {

    console.log(city)
    const data = { city: title.toLowerCase(), possession: possessionStatus, expand: "image" }
    console.log(data)
    dispatch(getPropertyList(data)).then(() => {
      console.log("dispatched")
      navigate(`/propertylist/${title}`)
    }
    )
  }


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
