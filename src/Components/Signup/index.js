import React, { useContext, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { slideUp } from "../../Animation";
import axios from "axios";
import validator from "validator";
import { WebContext } from "../../Context/WebContext";
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

  const { setAlert } = useContext(WebContext);

  const userDetails = {
    first_name: name,
    last_name: "",
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

  //validator functions
  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setError("");
    } else {
      setError("Invalid Email");
      setAlert({
        show: true,
        message: "Invalid Email",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 2000);
    }
  };
  const validateMobile = (mobile) => {
    if (mobile.length !== 10) {
      setError("Invalid Mobile Number");
      setAlert({
        show: true,
        message: "Enter a valid mobile number",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 2000);
    } else {
      setError("");
    }
  };
  const validateName = (name) => {
    setError("Enter a valid name");
    if (name.length < 3) {
      setAlert({
        show: true,
        message: "Enter a valid name",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 2000);
    } else {
      setError("");
    }
  };
  const validatePassword = (password) => {
    setError("Enter a valid password");
    if (password.length < 8) {
      setAlert({
        show: true,
        message: "Password must be atleast 8 characters long",
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 2000);
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      setAlert({
        show: true,
        message: "Passwords do not match",
        type: "danger",
      });

      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 2000);
    } else {
      setError("");
    }
  };

  const validateForm = () => {
    validateName(name);
    validateEmail(email);
    validatePassword(password);
    validateMobile(mobileNumber);
  };

  //submit function
  const handleSignUp = (e) => {
    e.preventDefault();
    validateForm();
    if (error === "") {
      axios
        .post("http://127.0.0.1:8000/auth/register/", userDetails)
        .then((res) => {
          setAlert({
            show: true,
            message: "User created successfully",
            type: "success",
          });
          setTimeout(() => {
            setAlert({
              show: false,
              message: "",
              type: "",
            });
          }, 2000);
        })
        .catch((err) => {
          setAlert({
            show: true,
            message: "User already exists",
            type: "danger",
          });
          setTimeout(() => {
            setAlert({
              show: false,
              message: "",
              type: "",
            });
          }, 2000);
        });
    } else {
      setAlert({
        show: true,
        message: error,
        type: "danger",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 2000);
    }
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
                  required
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
                  required
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
                  required
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
                required
              />
            </div>
            <div className="form-category">
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="Email"
                type="text"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-category">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="Password"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-category">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="ConfirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="form-category">
              <input
                onChange={(e) => setMobileNumber(e.target.value)}
                type="text"
                placeholder="Mobile No."
                required
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.03 }}
              onClick={(e) => handleSignUp(e)}
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
