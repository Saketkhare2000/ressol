import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slideUp } from "../../Animation";
import { WebContext } from "../../Context/WebContext";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "./style.css";
import axios from "axios";
import Cookies from "js-cookie";
const LogIn = () => {
  let navigate = useNavigate();

  // const loggedIn = useSelector((state) => state.auth.loggedIn);
  // const loggedIn = Cookies.get('loggedIn') === 'true' ? true : false;

  useEffect(() => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if (reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, [])


  const { phoneNumber, setPhoneNumber, setAlert, base_url, loggedIn, setLoggedIn } = useContext(WebContext);
  // const loggedIn = Cookies.get("loggedIn") === "true" ? true : false;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const userDetails = {
    phone: phoneNumber,
  };
  const handleLogin = () => {
    axios({
      method: "post",
      url: `${base_url}api/otp/`,
      data: userDetails,
    })
      .then((res) => {
        toast.success("OTP sent successfully");
        navigate("/otphandle");
      })
      .catch((err) => {
        toast.error("Phone number not registered");
      });
  };

  return !loggedIn ? (
    <div className="login-page page">
      <motion.div
        variants={slideUp}
        initial="show"
        animate="animate"
        exit="hidden"
        className="login-card"
      >
        <h2>Log In</h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="login-form"
          action=""
        >
          <div className="form-category">
            <input
              {...register("Mobile", {
                required: "Enter your mobile number",
                minLength: {
                  value: 10,
                  message: "Mobile number must be 10 digits",
                },
                maxLength: 10,
              })}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="phone"
              type="text"
              required
              placeholder="Enter 10-digit Mobile Number"
            />
          </div>
          {errors.Mobile && (
            <div
              className="error-message"
              style={{
                color: "red",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              {errors.Mobile.message}
            </div>
          )}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
          >
            Login with OTP
          </motion.button>
        </form>
        <p className="label">
          New to 9Roof? <Link to="/signup">Sign Up Here</Link>
        </p>
      </motion.div>
    </div>
  )
    : (
      navigate("/dashboard")
    );
};

export default LogIn;
