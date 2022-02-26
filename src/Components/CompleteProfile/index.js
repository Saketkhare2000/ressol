import React, { useContext, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../actions/userActions";
import { useForm } from "react-hook-form";
import { slideUp } from "../../Animation";
import axios from "axios";
import Select from "react-select";
import cityData from "../../cities.json";
import stateData from "../../state.json";
import { WebContext } from "../../Context/WebContext";
import SampleUserImg from "../../assets/images/sample-user-img.png";
import toast from "react-hot-toast";

const CompleteProfile = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [user_type, setUser_Type] = useState("");
  const [image, setImage] = useState("");
  const {
    base_url,
    userName,
    setAlert,
    firstname,
    lastname,
    phoneNumber,
    setPhoneNumber,
  } = useContext(WebContext);
  const dispatch = useDispatch();

  const navigate = useNavigate();
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
  const cityOptions = cityData.map((city) => {
    const { name } = city;
    return {
      value: name,
      label: name,
    };
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const completeProfile = async (data) => {
    axios({
      method: "patch",
      url: `${base_url}api/profile_name/${userName}/`,
      data: profileDetails,

    })
      .then((res) => {
        toast.success("Profile created successfully");

        axios({
          method: "post",
          url: `${base_url}api/otp/`,
          data: userDetails,
        });
        navigate("/otphandle");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const stateOptions = stateData.map((state) => {
    const { name } = state;
    return {
      value: name,
      label: name,
    };
  });
  const handleChangeCity = (selectedOption) => {
    setCity(selectedOption.value);
  };
  const handleChangeState = (selectedOption) => {
    setState(selectedOption.value);
  };

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
        <form className="signup-form" onSubmit={handleSubmit(completeProfile)}>
          <div className="user-image">
            {image === "" ? (
              <img src={SampleUserImg} alt="user" />
            ) : (
              <img src={image.image.full_size} alt="user" />
            )}

            <input
              onChange={(e) => {
                dispatch(uploadImage(e.target.files[0], base_url)).then(
                  (res) => {
                    setImage(res);
                  }
                );
              }}
              type="file"
              name="user_image"
              accept="image/*"
            />
          </div>
          <div className="form-category">
            <label htmlFor="usertype">You are</label>
            <div className="select-options">
              <div className="select-option">
                <input
                  type="radio"
                  name="usertype"
                  value="Buyer/Owner"
                  onChange={(e) => setUser_Type(e.target.value)}
                />
                <span>Buyer/Owner</span>
              </div>
              <div className="select-option">
                <input
                  type="radio"
                  name="usertype"
                  value="Agent"
                  onChange={(e) => setUser_Type(e.target.value)}
                />
                <span>Agent</span>
              </div>
            </div>
          </div>
          <div className="form-category">
            <input
              {...register("Password", {
                required: "Enter your mobile number",
                minLength: {
                  value: 10,
                  message: "Mobile number must be 10 digits",
                },
                maxLength: 10,
              })}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="phonenumber"
              type="text"
              placeholder="Enter Mobile Number"
            />
          </div>
          {errors.Password && (
            <div className="error-message" style={{ color: "red" }}>
              {errors.Password.message}
            </div>
          )}
          <div className="form-category">
            <Select
              className="select-input"
              placeholder="Your City"
              onChange={handleChangeCity}
              options={cityOptions}
              openMenuOnClick={false}
              required
            />
          </div>
          <div className="form-category">
            <Select
              className="select-input"
              placeholder="Your State"
              onChange={handleChangeState}
              options={stateOptions}
              openMenuOnClick={false}
            />
          </div>
          <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.01 }}>
            Complete Profile
          </motion.button>
        </form>
        <p className="label">
          Already have an account? <Link to="/login">Log In now</Link>
        </p>
      </motion.div>
    </div>
  );
};
export default CompleteProfile;
