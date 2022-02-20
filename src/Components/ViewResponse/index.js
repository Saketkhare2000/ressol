import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { WebContext } from "../../Context/WebContext";
import axios from 'axios';
import "../../Components/ViewResponse/style.css"
import { BsFillTelephoneFill } from "react-icons/bs";


const ViewResponse = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    // const key = useSelector((state) => state.auth.key);
    const [contactedByDetails, setContactedByDetails] = React.useState()
    const [timestamp, setTimeStamp] = React.useState()
    // const { userName } = useContext(WebContext);
    const { phoneNumber } = useContext(WebContext);
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:8000/api/profile/${phoneNumber}/?expand=image,contacted_by.user,contacted_by.property,contacted_to.user,contacted_to.property`,
            // headers: {
            //     Authorization: `Bearer ${key}`,
            // },
        })
            .then((res) => {
                // setResponseDetails(res.data)
                return res.data
            }
            )
            .then((res) => {
                setContactedByDetails(res.contacted_by)
                return res.contacted_by
            })
            .then(res => {
                if (res.length > 0) {
                    const timeData = []
                    res.map((item, index) => {
                        let time = new Date(item.timestamp)

                        return timeData.push(time.toLocaleString('en-US', {
                            weekday: 'short', // long, short, narrow
                            day: 'numeric', // numeric, 2-digit
                            year: 'numeric', // numeric, 2-digit
                        }))
                    })
                    setTimeStamp(timeData)
                }
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
    }, []);
    // if (responseDetails !== undefined) {
    //     setContactedByDetails(responseDetails.contacted_by)
    // }
    // console.log(contactedByDetails)
    // const contactedBy = responseDetails.contacted_by
    // console.log(contactedBy)

    return (
        <div className='page'>
            <div className="back" onClick={() => navigate('/dashboard')}>
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                <h1 className="mobile-title">View Responses</h1>
            </div>
            <div className="view-response-container">

                {
                    contactedByDetails ? Object.keys(contactedByDetails).map((contact, index) => {
                        return (
                            <div className="view-response-card">
                                <div className="contacted-by-details">
                                    <p className='contacted-by-title'>{contactedByDetails[contact].user.username}
                                        {(() => {
                                            if (contactedByDetails[contact].user.user_type === "Buyer/Owner") {
                                                return (
                                                    <span>(Individual)</span>
                                                )
                                            } else if (contactedByDetails[contact].user.user_type === "Agent") {
                                                return (
                                                    <span>(Agent)</span>
                                                )
                                            }

                                            else {
                                                return (
                                                    <span>(Builder)</span>
                                                )
                                            }
                                        })()}
                                    </p>
                                    <p className='contact-number'><BsFillTelephoneFill /> {contactedByDetails[contact].user.mobile}</p>
                                </div>
                                <div className="property-title">
                                    <div className="property-name">{contactedByDetails[contact].property.property_name}</div>
                                    <div className="property-locality">{contactedByDetails[contact].property.location}</div>
                                </div>

                                <div className="contact-details">
                                    {timestamp !== undefined ? <p><span> Received On:</span> {timestamp[index]} </p> : <></>}


                                </div>
                                <div className="property-details">
                                    <div className="property-price">₹ {contactedByDetails[contact].property.price}</div>
                                    <div className="property-type">
                                        {(() => {
                                            if (contactedByDetails[contact].property.property_type === "FL") {
                                                return (
                                                    <p>Flat/Apartment</p>
                                                )
                                            } else if (contactedByDetails[contact].property.property_type === "VI") {
                                                return (
                                                    <p>House/Villa</p>

                                                )
                                            }
                                            else if (contactedByDetails[contact].property.property_type === "PT") {
                                                return (
                                                    <p>Plot</p>

                                                )
                                            }

                                            else {
                                                return (
                                                    <p>Commercial</p>
                                                )
                                            }
                                        })()}
                                    </div>
                                    <div className="property-for">{contactedByDetails[contact].property.for_status}</div>
                                </div>
                            </div>
                        );
                    }) : <></>
                }

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
    )
}

export default ViewResponse