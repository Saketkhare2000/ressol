import React from 'react'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import "./style.css"
import axios from "axios";

import Loader from "../Loader";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";


const Wishlist = () => {
    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.userData.userData);
    const wishlistDetails = userDetails.wishlist
    console.log(wishlistDetails);
    function numDifferentiation(value) {
        var val = Math.abs(value)
        if (val >= 10000000) {
            val = Math.floor((val / 10000000).toFixed(2)) + ' Cr';
        } else if (val >= 100000) {
            val = Math.floor((val / 100000).toFixed(2)) + ' Lac';
        }
        return val;
    }
    const removeWishlist = (id) => {
        console.log(userDetails.id);
        console.log(id);
        axios({
            method: "post",
            url: `http://localhost:8000/api/wish`,
            data: {
                profile: userDetails.id,
                property: id,
            },
        })
            .then((res) => {
                console.log(res);
                navigate("/dashboard/wishlist");
            }
            )
    }
    return (
        <div className='page'><div className="back" onClick={() => navigate('/dashboard')}>
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
            <h1 className="mobile-title">Wishlist</h1>
        </div>
            {
                wishlistDetails ? Object.keys(wishlistDetails).map((property, index) => {
                    return (
                        <AnimatePresence>
                            <div className="wishlist-property-card">
                                <Link to={`/property/${wishlistDetails[property].id}`}>
                                    <div key={index} className="wishlist-detail-card">
                                        <div className="img-container">
                                            <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-1.2.1" alt="" />
                                        </div>
                                        <div className="property-detail-card-details">
                                            <p className="property-price">₹ {numDifferentiation(wishlistDetails[property].price)}</p>
                                            <p className="property-name">
                                                {wishlistDetails[property].property_name}
                                            </p>
                                            <p className="property-city">
                                                {wishlistDetails[property].city}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="options-btn-container">
                                    <button className=' btn-secondary' onClick={(e) => removeWishlist(wishlistDetails[property].id)}>Remove</button>
                                </div>
                            </div>
                        </AnimatePresence>
                    );
                }) : <Loader />
            }</div >
    )
}

export default Wishlist