import React, { useContext, useEffect } from 'react'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import SamplePropertyImage from "../../assets/images/SamplePropertyImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../actions/userActions";

import { AiOutlineDelete } from "react-icons/ai";
import "./style.css"
import Loader from "../Loader";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from 'axios';


const ManageProperties = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { editPropertyId, setEditPropertyId, phoneNumber } = useContext(WebContext);
    useEffect(() => {
        // dispatch(getUserData(userName, key));
        dispatch(getUserData(phoneNumber));
    }, []);
    const userDetails = useSelector((state) => state.userData.userData);
    const yourPropertyDetails = userDetails.properties
    console.log(yourPropertyDetails);
    function numDifferentiation(value) {
        var val = Math.abs(value)
        if (val >= 10000000) {
            val = Math.floor((val / 10000000).toFixed(2)) + ' Cr';
        } else if (val >= 100000) {
            val = Math.floor((val / 100000).toFixed(2)) + ' Lac';
        }
        return val;
    }
    const handleEdit = (id) => {
        console.log("edit");
        console.log(id)
        setEditPropertyId(id);
        navigate("/dashboard/manage-properties/edit-property/")
    }
    const handleDelete = (id) => {
        console.log(id)
        axios({
            method: "delete",
            url: `http://localhost:8000/api/property/${id}/`,
        })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className='page'><div className="back" onClick={() => navigate('/dashboard')}>
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
            <h1 className="mobile-title">Manage Properties</h1>
        </div>
            {
                yourPropertyDetails ? Object.keys(yourPropertyDetails).map((property, index) => {
                    return (
                        <AnimatePresence>
                            <div className="manage-property-card">
                                {/* <Link to={`/property/${yourPropertyDetails[property].id}`}> */}
                                <div key={index} className="your-property-detail-card">
                                    <div className="img-container">
                                        {/* <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1" alt="" /> */}
                                        {
                                            yourPropertyDetails[property].image.length > 0 ?
                                                <img src={yourPropertyDetails[property].image[0].image.full_size} alt="" />
                                                :
                                                <img src={SamplePropertyImage} alt="" />
                                        }
                                    </div>
                                    <div className="property-detail-card-details">
                                        <p className="property-price">₹ {numDifferentiation(yourPropertyDetails[property].price)}</p>
                                        <p className="property-name">
                                            {yourPropertyDetails[property].property_name}
                                        </p>
                                        <p className="property-city">
                                            {yourPropertyDetails[property].city}
                                        </p>
                                    </div>
                                </div>
                                {/* </Link> */}
                                <div className="options-btn-container">
                                    <div className="delete-btn" onClick={() => { handleDelete(yourPropertyDetails[property].id); }}>
                                        <AiOutlineDelete style={{ fontSize: "22px" }} className="delete-icon" />
                                        <p>Delete</p>
                                    </div>

                                    {/* <button className=' btn-secondary' >Disable Property</button> */}
                                    <button className='btn-primary' onClick={() => handleEdit(yourPropertyDetails[property].id)}>Edit</button>
                                </div>
                            </div>
                        </AnimatePresence>
                    );
                }) : <Loader />
            }</div >
    )
}

export default ManageProperties
