import React, { useContext, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { slideUp } from "../../Animation";
import axios from "axios";

import { CgSpinner } from "react-icons/cg";
import { WebContext } from "../../Context/WebContext";
import slugify from "slugify";

const SignUp = () => {
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
  //validator functions
  // const validateEmail = (email) => {
  //   if (validator.isEmail(email)) {
  //     setError("");
  //   } else {
  //     setError("Invalid Email");
  //     setAlert({
  //       show: true,
  //       message: "Invalid Email",
  //       type: "danger",
  //     });
  //     setTimeout(() => {
  //       setAlert({
  //         show: false,
  //         message: "",
  //         type: "",
  //       });
  //     }, 2000);
  //   }
  // };
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
  // const validateName = (name) => {
  //   if (name.length < 3) {
  //     setAlert({
  //       show: true,
  //       message: "Enter a valid name",
  //       type: "danger",
  //     });
  //     setTimeout(() => {
  //       setAlert({
  //         show: false,
  //         message: "",
  //         type: "",
  //       });
  //     }, 2000);
  //     return true
  //   } else {
  //     setError("");
  //     return false
  //   }
  // };
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
      return true;
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
      return false;
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
  const handleSignUp = (e) => {
    setSpinner(true);
    e.preventDefault();
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
          // Get cookie function
          // const csrftoken = getCookie('csrftoken');
          // Set the with credentials to true
          //   axios.defaults.withCredentials = true;
          //   // Add a header to set the csrf token in post requests
          //   axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
          //   // Set the user data in local storage
          //   localStorage.setItem("user", JSON.stringify(res.data));
          //   // Set the user data in the state
          //   setUserName(res.data.first_name);
          //   setRegisterKey(true);
          //   setSpinner(false);
          //   setRegister(true);
          //   setTimeout(() => {
          //     navigate("/");
          //   }, 2000);
          // })

          // Get csrf token cookie
          // let csrftoken = getCookie('csrftoken');
          // console.log(csrftoken);
          // Set csrf token in header
          // axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
          // axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
          // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
          // axios.defaults.headers.common['Accept'] = 'application/json';

          setUserName(slugify(username, "_"));
          setFirstname(firstName);
          setLastname(lastName);
          setRegisterKey(res.data.key);
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
          navigate("/completeProfile");
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
          <form className="signup-form" action="">
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
                onClick={(e) => handleSignUp(e)}
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
