import React, { useState } from "react";
import "./style.css";
import mobile from "../../mobile.json";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { slideUp } from "../../Animation";
const SignUp = () => {
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
      <div className="signup-page">
        <motion.div
          variants={slideUp}
          initial="show"
          animate="animate"
          exit="hidden"
          className="signup-card"
        >
          <h1>Sign Up</h1>
          <form className="signup-form" action="">
            <div className="form-category">
              <div className="form-group">
                <input
                  id="Buyer"
                  type="radio"
                  name="type"
                  placeholder="Buyer/Owner"
                />
                <label htmlFor="Buyer">Buyer/Owner</label>
              </div>
              <div className="form-group">
                <input
                  id="Builder"
                  type="radio"
                  name="type"
                  placeholder="Seller"
                  value="Builder"
                />
                <label htmlFor="Builder">Builder</label>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="Agent"
                  name="type"
                  placeholder="Agent"
                  value="Agent"
                />
                <label htmlFor="Agent">Agent</label>
              </div>
            </div>
            <div className="form-category">
              <input
                onChange={(e) => setName(e.target.value)}
                id="Name"
                type="text"
                placeholder="Name"
              />
            </div>
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
            <div className="form-category">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="ConfirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="form-category">
              <select name="mobile number">
                {mobile.map((item, index) => (
                  <option key={index} value="item">
                    {item.dial_code} - {item.code}
                  </option>
                ))}
              </select>
              <input
                onChange={(e) => setMobileNumber(e.target.value)}
                type="text"
                placeholder="Mobile No."
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleSubmit}
            >
              Sign Up
            </motion.button>
          </form>
          <p className="label">
            Already have an account? <Link to="/login">Log In now</Link>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SignUp;
