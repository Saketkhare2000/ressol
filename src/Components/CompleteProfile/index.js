import React, { useContext, useState } from 'react'
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { slideUp } from "../../Animation";
import axios from "axios";
import Select from 'react-select'
import cityData from "../../cities.json";
import stateData from "../../state.json";
import { WebContext } from '../../Context/WebContext';
const CompleteProfile = () => {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [mobile, setMobile] = useState("");
    const [user_type, setUser_Type] = useState("");
    const [bio, setBio] = useState("");
    const { userName, setAlert } = useContext(WebContext);
    const navigate = useNavigate();
    console.log(userName)
    const profileDetails = {
        bio: bio,
        mobile: mobile,
        city: city,
        state: state,
        user_type: user_type,
        image: "",
    };
    const cityOptions = cityData.map(city => {
        const { name } = city;
        return {
            value: name,
            label: name,
        }
    });

    const completeProfile = async (e) => {
        e.preventDefault();
        axios
            .patch(`http://127.0.0.1:8000/api/profile/${userName}/`, profileDetails)
            .then((res) => {
                console.log(res);
                setAlert({
                    show: true,
                    type: "success",
                    message: "Profile Updated Successfully",
                });
                setTimeout(() => {
                    setAlert({
                        show: false,
                        type: "",
                        message: "",
                    });
                }, 2000);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setAlert({
                    show: true,
                    type: "danger",
                    message: err.message,
                });
                setTimeout(() => {
                    setAlert({
                        show: false,
                        type: "",
                        message: "",
                    });
                }, 2000);
            });
    }

    const stateOptions = stateData.map(state => {
        const { name } = state;
        return {
            value: name,
            label: name,
        }
    });
    const handleChangeCity = (selectedOption) => {
        setCity(selectedOption.value);
    }
    const handleChangeState = (selectedOption) => {
        setState(selectedOption.value);
    }

    return (
        <div className="signup-page">
            <motion.div
                variants={slideUp}
                initial="show"
                animate="animate"
                exit="hidden"
                className="signup-card"
            >
                <h1>Complete Your Profile</h1>
                <form className="signup-form" action="">
                    <div className="form-category">
                        <label htmlFor="usertype">You are</label>
                        <div className="select-options">
                            <div className="select-option">
                                <input type="radio" name="usertype" value="Buyer/Owner" onChange={(e) => setUser_Type(e.target.value)} />
                                <span>Buyer/Owner</span>
                            </div>
                            <div className="select-option">
                                <input type="radio" name="usertype" value="Agent" onChange={(e) => setUser_Type(e.target.value)} />
                                <span>Agent</span>
                            </div>
                            <div className="select-option">
                                <input type="radio" name="usertype" onChange={(e) => setUser_Type(e.target.value)} value="Builder" />
                                <span>Builder</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-category">
                        <input
                            onChange={(e) => setMobile(e.target.value)}
                            id="phonenumber"
                            type="text"
                            placeholder="Enter Mobile Number"
                            required
                        />
                    </div>


                    <div className="form-category">
                        <Select className='select-input' placeholder="Your City" onChange={handleChangeCity} options={cityOptions} openMenuOnClick={false} required />
                    </div>
                    <div className="form-category">
                        <Select className='select-input' placeholder="Your State" onChange={handleChangeState} options={stateOptions} openMenuOnClick={false} />
                    </div>
                    <div className="form-category">
                        <textarea name="bio" id="bio" onChange={(e) => setBio(e.target.value)} ></textarea>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.01 }}
                        onClick={(e) => completeProfile(e)}
                    >
                        Complete Profile
                    </motion.button>
                </form>
                <p className="label">
                    Already have an account? <Link to="/login">Log In now</Link>
                </p>
            </motion.div>
        </div>
    )
}
export default CompleteProfile