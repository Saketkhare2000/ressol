import React, { useState } from "react";
import "./style.css";
import mobile from "../../mobile.json";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { slideUp } from "../../Animation";
import axios from "axios";
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
  //mobile number
  const [mobileNumber, setMobileNumber] = useState(0);

  const userDetails = {
    name: name,
    email: email,
    password: password,
    username: name,
    mobile_number: mobileNumber,
    area: "area 51",
    city: "city 51",
    address: "address 51",
    pincode: "51",
  };
  const passwordCheck = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  //submit function
  const handleSignUp = async (e) => {
    e.preventDefault();
    passwordCheck();
    axios.post("http://127.0.0.1:8000/api/user/", userDetails).then((res) => {
      console.log(res);
    });
  };
  return (
    <AnimatePresence initial={true} exitBeforeEnter>
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
              <input
                onChange={(e) => setMobileNumber(e.target.value)}
                type="text"
                placeholder="Mobile No."
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleSignUp}
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
