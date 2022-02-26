import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { WebContext } from "../../Context/WebContext";
import axios from "axios";
import "../../Components/ViewResponse/style.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const ViewResponse = () => {
  const navigate = useNavigate();
  // const loggedIn = useSelector((state) => state.auth.loggedIn);
  const loggedIn = Cookies.get("loggedIn") === "true" ? true : false;
  const phoneNumber = Cookies.get("phonenumber");
  // const key = useSelector((state) => state.auth.key);
  const [primeDetails, setPrimeDetails] = React.useState();
  const [contactedByDetails, setContactedByDetails] = React.useState();
  const [timestamp, setTimeStamp] = React.useState();
  // const { userName } = useContext(WebContext);
  const { base_url } = useContext(WebContext);
  useEffect(() => {
    axios({
      method: "get",
      url: `${base_url}api/profile/${phoneNumber}/?expand=image,contacted_by.user,contacted_by.property,contacted_to.user,contacted_to.property,prime_status`,
      // headers: {
      //     Authorization: `Bearer ${key}`,
      // },
    })
      .then((res) => {
        setPrimeDetails(res.data.prime_status);
        return res.data;
      })
      .then((res) => {
        setContactedByDetails(res.contacted_by);
        return res.contacted_by;
      })
      .then((res) => {
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
      .catch((err) => { });
  }, []);
  return (
    <div className="page">
      <div className="back" onClick={() => navigate("/dashboard")}>
        <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        <h2>View Responses</h2>
      </div>
      <div className="view-response-container">
        {contactedByDetails ? (
          Object.keys(contactedByDetails).map((contact, index) => {
            return (
              <div className="view-response-card">
                <div className="contacted-by-details">
                  <p className="contacted-by-title">
                    {contactedByDetails[contact].user.first_name}{" "}
                    {contactedByDetails[contact].user.last_name}
                    {(() => {
                      if (
                        contactedByDetails[contact].user.user_type ===
                        "Buyer/Owner"
                      ) {
                        return <span>(Individual)</span>;
                      } else if (
                        contactedByDetails[contact].user.user_type === "Agent"
                      ) {
                        return <span>(Agent)</span>;
                      } else {
                        return <span>(Builder)</span>;
                      }
                    })()}
                  </p>
                  {primeDetails.is_prime ? (
                    <p className="contact-number">
                      <BsFillTelephoneFill />{" "}
                      {contactedByDetails[contact].user.mobile}
                    </p>
                  ) : (
                    <p className="contact-number">
                      <BsFillTelephoneFill /> XXXX-XXXX-XX (For Prime Members)
                    </p>
                  )}
                </div>
                <div className="property-title">
                  <div className="property-name">
                    {contactedByDetails[contact].property.property_name}
                  </div>
                  <div className="property-locality">
                    {contactedByDetails[contact].property.location}
                  </div>
                </div>

                <div className="contact-details">
                  {timestamp !== undefined ? (
                    <p>
                      <span> Received On:</span> {timestamp[index]}{" "}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="property-details">
                  <div className="property-price">
                    Price : ₹{contactedByDetails[contact].property.price}
                  </div>
                  <div className="property-type">
                    {(() => {
                      if (
                        contactedByDetails[contact].property.property_type ===
                        "FL"
                      ) {
                        return <p>Type : Flat/Apartment</p>;
                      } else if (
                        contactedByDetails[contact].property.property_type ===
                        "VI"
                      ) {
                        return <p>Type : House/Villa</p>;
                      } else if (
                        contactedByDetails[contact].property.property_type ===
                        "PT"
                      ) {
                        return <p>Type : Plot</p>;
                      } else {
                        return <p>Type : Commercial</p>;
                      }
                    })()}
                  </div>
                  <div className="property-for">
                    For : {contactedByDetails[contact].property.for_status}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>{null}</>
        )}

        {/* <div className="view-response-card">
                    <div className="contacted-by-details">
                        <p className='contacted-by-title'>Username <span>(Agent)</span></p>
                        <p className='contact-number'>7415192769</p>
                    </div>
                    <div className="contact-details">

                        <p><span> Received On:</span> 22 Sept 2022</p>

                    </div>
                    <div className="property-details">
                        <div className="property-for">Rent</div>
                        <div className="property-name">Property name</div>
                        <div className="property-price">Rs 150000</div>
                        <div className="property-locality">Location</div>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default ViewResponse;
