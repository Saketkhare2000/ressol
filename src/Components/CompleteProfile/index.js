import React, { useContext, useState } from 'react'
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../actions/userActions";

import { slideUp } from "../../Animation";
import axios from "axios";
import Select from 'react-select'
import cityData from "../../cities.json";
import stateData from "../../state.json";
import { WebContext } from '../../Context/WebContext';
import SampleUserImg from "../../assets/images/sample-user-img.png";

const CompleteProfile = () => {
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [mobile, setMobile] = useState("");
    const [user_type, setUser_Type] = useState("");
    // const [bio, setBio] = useState("");
    const [image, setImage] = useState("");
    console.log(image);
    const { userName, setAlert, registerKey, firstname, setFirstname, lastname, setLastname, phoneNumber, setPhoneNumber } = useContext(WebContext);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    console.log(userName)
    console.log(registerKey)
    const profileDetails = {
        user: "1",
        first_name: firstname,
        last_name: lastname,
        // bio: bio,
        mobile: phoneNumber,
        city: city,
        state: state,
        user_type: user_type,
        image: image.pk,
    };
    const userDetails = {
        phone: phoneNumber,
    };
    console.log(profileDetails);
    const cityOptions = cityData.map(city => {
        const { name } = city;
        return {
            value: name,
            label: name,
        }
    });
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    console.log(csrftoken)
    const completeProfile = async (e) => {
        e.preventDefault();

        axios({
            method: "patch",
            url: `http://localhost:8000/api/profile_name/${userName}/`,
            data: profileDetails,
            headers: {
                "X-CSRFToken": csrftoken,
                // "Authorization": `Token ${registerKey}`,
            },
        })
            .then((res) => {
                console.log(res);
                setAlert({
                    show: true,
                    type: "success",
                    message: "Profile Created Successfully",
                });
                setTimeout(() => {
                    setAlert({
                        show: false,
                        type: "",
                        message: "",
                    });
                }, 2000);
                // navigate("/otphandle");
                axios({
                    method: "post",
                    url: "http://localhost:8000/api/otp/",
                    data: userDetails,
                }).then((res) => {
                    console.log(res.data);
                });
                navigate("/otphandle")
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
        <div className="signup-page page">
            <motion.div
                variants={slideUp}
                initial="show"
                animate="animate"
                exit="hidden"
                className="signup-card"
            >
                <h2>Complete Your Profile</h2>
                <form className="signup-form" action="">
                    <div className="user-image">
                        {image === "" ? (
                            <img src={SampleUserImg} alt="user" />
                        ) : (
                            <img src={image.image.full_size} alt="user" />
                        )}

                        <input onChange={(e) => {
                            (dispatch(uploadImage(e.target.files[0]))
                                .then((res) => {
                                    // console.log(res);
                                    setImage(res);
                                }))
                        }} type="file" name="user_image" accept="image/*" />
                    </div>
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
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                    {/* <div className="form-category">
                        <textarea name="bio" id="bio" placeholder='Tell us about yourself (optional)' onChange={(e) => setBio(e.target.value)} ></textarea>
                    </div> */}
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