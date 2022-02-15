import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import SampleUserImg from "../../assets/images/sample-user-img.png";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../actions/userActions";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProfileDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userName } = useContext(WebContext);
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const key = useSelector((state) => state.auth.key);
    const userDetails = useSelector((state) => state.userData.userData);
    // User Detail States
    // const [city, setCity] = useState("");
    // const [state, setState] = useState("");
    // const [mobile, setMobile] = useState("");
    // // const [user_type, setUser_Type] = useState("");
    // const [bio, setBio] = useState("");
    // const [image, setImage] = useState("");
    // console.log(image);
    // const { userName, setAlert, registerKey } = useContext(WebContext);
    // const editProfileDetails = {
    //     user: userDetails.id,
    //     bio: bio,
    //     mobile: mobile,
    //     city: city,
    //     state: state,
    //     image: image.pk,
    // };
    //////////
    useEffect(() => {
        dispatch(getUserData(userName, key));
    }, []);
    return (

        <div className="profile-details-page page">
            <div className="profile-details-header">

                <div className="back" onClick={() => navigate('/dashboard')}>
                    <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                    <h2>Profile</h2>
                    {/* <p>Go Back</p> */}
                </div>
                <button className="btn btn-secondary">
                    Edit
                </button>
            </div>
            <motion.form
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                transition={{ ease: "easeInOut", staggerChildren: 0.2 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                layout
                className="disclosure-panel"
                action=""
            >
                <div className="profile-user-image form-group" >
                    {userDetails.image == null ? (
                        <img src={SampleUserImg} alt="user" />
                    ) : (
                        <img src={userDetails.image.image.full_size} alt="user" />
                    )}
                </div>
                <motion.div layout className="form-group">
                    <label htmlFor="select">Name</label>
                    <input type="text" placeholder="Name" value={userDetails.username} />
                </motion.div>
                <motion.div layout className="form-group">
                    <label htmlFor="select">Email</label>
                    <input type="text" placeholder="Email" value={userDetails.email} />
                </motion.div>
                <motion.div layout className="form-group">
                    <label htmlFor="select">Phone</label>
                    <input
                        type="text"
                        placeholder="Phone"
                        value={userDetails.mobile}
                    />
                </motion.div>
                <motion.div layout className="form-group">
                    <label htmlFor="select">City</label>
                    <input type="text" placeholder="City" value={userDetails.city} />
                </motion.div>
                <motion.div layout className="form-group">
                    <label htmlFor="select">State</label>
                    <input type="text" placeholder="State" value={userDetails.state} />
                </motion.div>
                <motion.div layout className="form-group">
                    <label htmlFor="select">Bio</label>
                    <input type="text" placeholder="Edit Bio" value={userDetails.bio} />
                </motion.div>

                {/* <motion.div layout className="form-group">
                    <label htmlFor="select">Password</label>
                    <input
                        type="text"
                        placeholder="Password"
                        value={userDetails.password}
                    />
                </motion.div> */}

            </motion.form>
        </div>
    )
}

export default ProfileDetails