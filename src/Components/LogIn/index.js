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
  //mobile number code
  const [mobileCode, setMobileCode] = useState("");
  //mobile number
  const [mobileNumber, setMobileNumber] = useState("");
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
              onClick={handleSubmit}
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
