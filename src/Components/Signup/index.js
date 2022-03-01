import React, { useContext, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { slideUp } from "../../Animation";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { WebContext } from "../../Context/WebContext";
import slugify from "slugify";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
const SignUp = () => {
  const { handleSubmit } = useForm();
  const [spinner, setSpinner] = useState(false);
  //register state
  const [register, setRegister] = useState(false);
  //name state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //email state
  // const [email, setEmail] = useState("");
  //password state
  const [password, setPassword] = useState("");
  //confirm password state
  const [confirmPassword, setConfirmPassword] = useState("");
  //error state
  const [error, setError] = useState("");
  //mobile number

  const {
    setAlert,
    userName,
    setUserName,
    registerKey,
    setRegisterKey,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    base_url,
    phoneNumber,
    setPhoneNumber,
    loggedIn,
    setLoggedIn,
  } = useContext(WebContext);

  const username =
    firstName + lastName + Math.floor(Math.random() * 1000).toString();

  const userDetails = {
    first_name: firstName,
    last_name: lastName,
    username: slugify(username, "_"),
    password1: password,
    password2: confirmPassword,
  };
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8) {
      toast.error("Password must be atleast 8 characters");
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password must match");
    } else {
      setError("");
      return false;
    }
  };

  const validateForm = () => {
    // validateName(name)
    // validateEmail(email)
    validatePassword(password);
  };

  //submit function
  const handleSignUp = () => {
    setSpinner(true);
    // console.log(validateForm() === true ? "true" : "false");
    validateForm();
    if (error === "") {
      axios({
        method: "post",
        url: `${base_url}auth/register/`,
        data: userDetails,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setUserName(slugify(username, "_"));
          setFirstname(firstName);
          setLastname(lastName);
          setRegisterKey(res.data.key);
          toast.success("User registered successfully");

          setRegister(true);

          setSpinner(false);
          navigate("/completeProfile");
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setSpinner(false);
        });
    } else {
      toast.error("Something went wrong");
      setSpinner(false);
    }
  };
  return !register ? (
    <AnimatePresence initial={true} exitBeforeEnter>
      <div className="signup-page page">
        <motion.div
          variants={slideUp}
          initial="show"
          animate="animate"
          exit="hidden"
          className="signup-card"
        >
          <h2>Create Account</h2>
          <form className="signup-form" onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-category">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                id="Name"
                type="text"
                placeholder="First Name"
                required
              />
            </div>
            <div className="form-category">
              <input
                onChange={(e) => setLastName(e.target.value)}
                id="Name"
                type="text"
                placeholder="Last Name"
                required
              />
            </div>
            {/* <div className="form-category">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  id="Email"
                  type="text"
                  placeholder="Email"
                  required
                />
              </div> */}
            <div className="form-category">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="Password"
                type="password"
                placeholder="Password"
                required
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginTop: "8px",
                  opacity: 0.5,
                }}
              >
                min 8 letters and 1 special character
              </span>
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
            {spinner ? (
              <div className="spinner-container">
                <CgSpinner className="spinner" />
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.01 }}
              >
                Create Profile
              </motion.button>
            )}
          </form>
          <p className="label">
            Already have an account? <Link to="/login">Log In now</Link>
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  ) : (
    <h1>Registered</h1>
  );
};

export default SignUp;
