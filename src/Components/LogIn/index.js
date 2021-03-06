import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slideUp } from "../../Animation";
import { WebContext } from "../../Context/WebContext";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../../actions/userActions";
import "./style.css";
import axios from "axios";

const LogIn = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { userName, setUserName, phoneNumber, setPhoneNumber, setAlert } = useContext(WebContext);
  console.log(phoneNumber)
  const userDetails = {
    // username: userName,
    phone: phoneNumber,
    // password: password,
  };
  // Validator Function Phone Number
  // const validateMobile = (mobile) => {
  //   if (mobile.length !== 10) {
  //     setError("Invalid Mobile Number");
  //     setAlert({
  //       show: true,
  //       message: "Enter a valid mobile number",
  //       type: "danger",
  //     });
  //     setTimeout(() => {
  //       setAlert({
  //         show: false,
  //         message: "",
  //         type: "",
  //       });
  //     }, 2000);
  //   } else {
  //     setError("");
  //   }
  // };
  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8000/api/otp/",
      data: userDetails,
    }).then((res) => {
      console.log(res.data);
    });
    setAlert({
      show: true,
      message: "OTP sent to your mobile number",
      type: "success",
    });
    setTimeout(() => {
      setAlert({
        show: false,
        message: "",
        type: "",
      });
    }, 2000);
    navigate("/otphandle")


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
        <form className="login-form" action="">
          <div className="form-category">
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="phone"
              type="text"
              required
              placeholder="Enter 10-digit Mobile Number"
            />
          </div>
          {/* <div className="form-category">
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="Password"
              type="password"
              placeholder="Password"
            />
          </div> */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleLogin}
          >
            Login with OTP
          </motion.button>
        </form>
        <p className="label">
          New to 9Roof? <Link to="/signup">Sign Up Here</Link>
        </p>
        {/* <p className="reset">Reset password</p> */}
      </motion.div>
    </div>
  ) : (
    <>{navigate("/dashboard")}</>
  );
};

export default LogIn;
