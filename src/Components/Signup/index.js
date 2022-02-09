import React, { useContext, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { slideUp } from "../../Animation";
import axios from "axios";
import validator from "validator";
import { CgSpinner } from "react-icons/cg";
import { WebContext } from "../../Context/WebContext";
const SignUp = () => {
  const [spinner, setSpinner] = useState(false);
  //register state
  const [register, setRegister] = useState(false)
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

  const { setAlert, userName, setUserName } = useContext(WebContext);


  const userDetails = {
    first_name: name,
    last_name: "",
    name: name,
    email: email,
    password1: password,
    password2: password,
    username: name,
    // mobile_number: mobileNumber,
    // area: "area 51",
    // city: "city 51",
    // address: "address 51",
    // pincode: "51",
  };
  const navigate = useNavigate();
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
  const validateName = (name) => {
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
      return true
    } else {
      setError("");
      return false
    }
  };
  const validatePassword = (password) => {
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
      return true
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
      return false
    } else {
      setError("");
      return false
    }
  };

  const validateForm = () => {
    validateName(name)
    validateEmail(email)
    validatePassword(password)
  };

  //submit function
  const handleSignUp = (e) => {
    setSpinner(true);
    e.preventDefault();
    console.log(error)
    // console.log(validateForm() === true ? "true" : "false");
    validateForm()
    if (error === "") {
      axios
        .post("http://127.0.0.1:8000/auth/register/", userDetails)
        .then((res) => {
          setUserName(name);
          setAlert({
            show: true,
            message: "User created successfully",
            type: "success",
          });
          setRegister(true);
          setTimeout(() => {
            setAlert({
              show: false,
              message: "",
              type: "",
            });
          }, 2000);
          setSpinner(false);
          navigate("/completeProfile")
        })
        .catch((err) => {
          setAlert({
            show: true,
            message: err.message,
            type: "danger",
          });
          setSpinner(false);
          setTimeout(() => {
            setAlert({
              show: false,
              message: "",
              type: "",
            });
            // navigate("/login");
          }, 2000);
        });
    } else {
      setAlert({
        show: true,
        message: error,
        type: "danger",
      });
      setSpinner(false);

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
    !register ?
      (<AnimatePresence initial={true} exitBeforeEnter>
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
              {/* <div className="form-category">
              <input
                onChange={(e) => setMobileNumber(e.target.value)}
                type="text"
                placeholder="Mobile No."
                required
              />
            </div> */}
              {
                spinner ?
                  <div className="spinner-container">

                    <CgSpinner className="spinner" />
                  </div>
                  :
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={(e) => handleSignUp(e)}
                  >
                    Sign Up
                  </motion.button>}
            </form>
            <p className="label">
              Already have an account? <Link to="/login">Log In now</Link>
            </p>
          </motion.div>
        </div>
      </AnimatePresence>)
      : (
        <h1>Registered</h1>
      )
  );
};

export default SignUp;
