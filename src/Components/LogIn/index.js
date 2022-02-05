import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slideUp } from "../../Animation";
import "./style.css";
const LogIn = () => {
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
  console.log(userDetails);
  //handle login
  const handleLogin = (e) => {
    e.preventDefault();
    //send data to server

      axios({
        method: 'post',
        url: 'http://localhost:8000/api/login/',
        data: userDetails
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AnimatePresence>
      <div className="login-page">
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
                onSubmit={(e) => setEmail(e.target.value)}
                id="Email"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="form-category">
              <input
                onSubmit={(e) => setPassword(e.target.value)}
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
    </AnimatePresence>
  );
};

export default LogIn;
