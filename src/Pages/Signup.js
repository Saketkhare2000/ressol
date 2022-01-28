import React, { useContext } from "react";
import LogIn from "../Components/LogIn";
import SignUp from "../Components/Signup";
import { WebContext } from "../Context/WebContext";

const Signup = () => {
  const { loggedIn, isLoggedIn } = useContext(WebContext);
  return <div className="page">{!loggedIn ? <SignUp /> : <LogIn />}</div>;
};

export default Signup;
