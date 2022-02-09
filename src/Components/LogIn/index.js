import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { slideUp } from "../../Animation";
import { WebContext } from "../../Context/WebContext";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../../actions/userActions";
import "./style.css";

const LogIn = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { userName, setUserName } = useContext(WebContext);

  const userDetails = {
    username: userName,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(userAuth(userDetails));
    if (loggedIn) {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return !loggedIn ? (
    <div className="login-page">
      {loggedIn ? <h1>Go to dashboard</h1> : ""}
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
              onChange={(e) => setUserName(e.target.value)}
              id="Username"
              type="text"
              placeholder="Username"
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
  ) : (
    <h1>
      <Link to="/dashboard">Go to dashboard</Link>
    </h1>
  );
};

export default LogIn;
