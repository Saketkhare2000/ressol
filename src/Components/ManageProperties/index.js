import React, { useContext, useEffect } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../actions/userActions";

import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import "./style.css";
import Loader from "../Loader";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const ManageProperties = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setEditPropertyId, base_url, phoneNumber, loggedIn } = useContext(WebContext);

  const [yourPropertyDetails, setYourPropertyDetails] = React.useState();
  const [timestamp, setTimeStamp] = React.useState();

  useEffect(() => {
    dispatch(getUserData(phoneNumber, base_url));
    axios({
      method: "get",
      url: `${base_url}api/profile/${phoneNumber}/?expand=properties.image`,
    }).then(res => {
      setYourPropertyDetails(res.data.properties);
      return res.data.properties;
    })
      .then(res => {
        if (res.length > 0) {
          const timeData = [];
          res.map((item, index) => {
            let time = new Date(item.timestamp);

            return timeData.push(
              time.toLocaleString("en-GB", {
                day: "numeric", // numeric, 2-digit
                month: "short", // long, short, narrow
                year: "numeric", // numeric, 2-digit
              })
            );
          });
          setTimeStamp(timeData);
        }
      })
  }, []);


  function numDifferentiation(value) {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = Math.floor((val / 10000000).toFixed(2)) + " Cr";
    } else if (val >= 100000) {
      val = Math.floor((val / 100000).toFixed(2)) + " Lac";
    }
    return val;
  }
  const handleEdit = (id) => {
    setEditPropertyId(id);
    Cookies.set("editPropertyId", id);
    navigate("/dashboard/manage-properties/edit-property/");
  };
  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: `${base_url}api/property/${id}/`,
    })
      .then(() => {
        toast.success("Property deleted successfully");
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="page">
      <div className="back" onClick={() => navigate("/dashboard")}>
        <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        <h2>Manage Properties</h2>
      </div>
      {yourPropertyDetails ? (
        Object.keys(yourPropertyDetails).map((property, index) => {
          return (
            <div className="manage-property-card">
              {/* <Link to={`/property/${yourPropertyDetails[property].id}`}> */}
              <div key={index} className="your-property-detail-card">
                <div className="img-container">
                  {/* <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1" alt="" /> */}
                  {yourPropertyDetails[property].image.length > 0 ? (
                    <img
                      src={
                        yourPropertyDetails[property].image[0].image.full_size
                      }
                      alt=""
                    />
                  ) : (
                    <img src={SamplePropertyImage} alt="" />
                  )}
                </div>
                <div className="property-detail-card-details">
                  <p className="property-price">
                    ₹ {numDifferentiation(yourPropertyDetails[property].price)}
                  </p>

                  {(() => {
                    if (yourPropertyDetails[property].property_type === "FL") {
                      return (
                        <p className="property-name">
                          {yourPropertyDetails[property].property_name} | Flat
                        </p>
                      );
                    } else if (
                      yourPropertyDetails[property].property_type === "VI"
                    ) {
                      return (
                        <p className="property-name">
                          {yourPropertyDetails[property].property_name} |
                          House/Villa
                        </p>
                      );
                    } else if (
                      yourPropertyDetails[property].property_type === "PT"
                    ) {
                      return (
                        <p className="property-name">
                          {yourPropertyDetails[property].property_name} | Plot
                        </p>
                      );
                    } else {
                      return (
                        <p className="property-name">
                          {yourPropertyDetails[property].property_name} |
                          Commercial
                        </p>
                      );
                    }
                  })()}
                  {timestamp ? (
                    <p className="posted-on">Posted On: {timestamp[index]}</p>
                  ) : (<></>)}
                  <p className="property-city">
                    {yourPropertyDetails[property].city}
                  </p>
                </div>
              </div>
              {/* </Link> */}
              <div className="options-btn-container">
                <div
                  className="delete-btn"
                  onClick={() => {
                    handleDelete(yourPropertyDetails[property].id);
                  }}
                >
                  <AiOutlineDelete
                    style={{ fontSize: "22px" }}
                    className="delete-icon"
                  />
                  <p>Delete</p>
                </div>

                {/* <button className=' btn-secondary' >Disable Property</button> */}
                <button
                  className="btn-primary"
                  onClick={() => handleEdit(yourPropertyDetails[property].id)}
                >
                  Edit <MdOutlineModeEditOutline style={{ color: "white" }} />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ManageProperties;
