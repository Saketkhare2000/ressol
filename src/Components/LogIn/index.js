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

  const { userName, setUserName, phoneNumber, setPhoneNumber } = useContext(WebContext);
  console.log(phoneNumber)
  const userDetails = {
    // username: userName,
    phone: phoneNumber,
    // password: password,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8000/api/otp/",
      data: userDetails,
    }).then((res) => {
      console.log(res.data);
    });
    navigate("/otphandle")
    // await dispatch(userAuth(userDetails));
    // if (loggedIn) {
    //   navigate("/");
    // } else {
    //   setError("Invalid username or password");
    // }
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
              placeholder="Mobile Number"
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
          New to Reessol? <Link to="/signup">Sign Up Here</Link>
        </p>
        {/* <p className="reset">Reset password</p> */}
      </motion.div>
    </div>
  ) : (
    <>{navigate("/dashboard")}</>
  );
};

export default LogIn;
