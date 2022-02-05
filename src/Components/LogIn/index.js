import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { slideUp } from "../../Animation";
import { WebContext } from "../../Context/WebContext";
import Alert from "../Alert";
import "./style.css";
const LogIn = () => {
  const [data, setData] = useState()
  //name state
  const [name, setName] = useState("");
  //email state
  const [email, setEmail] = useState("");
  //password state
  const [password, setPassword] = useState("");
  //confirm password state
  const [confirmPassword, setConfirmPassword] = useState("");
  //error state
  const [error, setError] = useState("");
  //submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
      //send data to server
    }
  };
  const userDetails = {
    email: email,
  };
  const { loggedIn, setLoggedIn, setAlert, userData, setUserData } = useContext(WebContext);
  //handle login
  const handleLogin = (e) => {
    e.preventDefault();
    //send data to server

    axios({
      method: "post",
      url: "http://localhost:8000/api/login/",
      data: userDetails,
    })
      .then((res) => {
        setUserData(res.data[0]);
        setLoggedIn(true);
        setAlert({
          show: true,
          message: "logged in",
          type: "success",
        });
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-page">
      {
        loggedIn ? <Link to="/dashboard" >Go to Dashboard of {userData.email}</Link> : null
      }
      <motion.div
        variants={slideUp}
        initial="show"
        animate="animate"
        exit="hidden"
        className="login-card"
      >
        <h1>Log In</h1>
        <form className="login-form" action="">
          <div className="form-category">
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="Email"
              type="text"
              placeholder="Email"
            />
          </div>
          <div className="form-category">
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="Password"
              type="password"
              placeholder="Password"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
            onClick={handleLogin}
          >
            Log In
          </motion.button>
        </form>
        <p className="label">
          New to Reessol? <Link to="/signup">Sign Up Here</Link>
        </p>
        <p className="reset">Reset password</p>
      </motion.div>
    </div>
  );
};

export default LogIn;
