import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { WebContext } from "../../Context/WebContext";
import axios from 'axios';
import "../../Components/ViewResponse/style.css"

const ViewResponse = () => {
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const key = useSelector((state) => state.auth.key);
    const [contactedByDetails, setContactedByDetails] = React.useState()
    const { userName } = useContext(WebContext);
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:8000/api/profile/${userName}/?expand=image,contacted_by.user,contacted_by.property,contacted_to.user,contacted_to.property`,
            headers: {
                Authorization: `Bearer ${key}`,
            },
        })
            .then((res) => {
                // setResponseDetails(res.data)
                return res.data
            }
            )
            .then((res) => {
                setContactedByDetails(res.contacted_by)
            })
            .catch((err) => {
                console.log(err);
            }
            );
    }, []);
    console.log(contactedByDetails)
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
                    contactedByDetails && contactedByDetails.length > 0 ? Object.keys(contactedByDetails).map((contact, index) => {
                        return (
                            <div className="view-response-card">
                                <div className="contacted-by-details">
                                    <p className='contacted-by-title'>{contact.user.username} <span>(Agent)</span></p>
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