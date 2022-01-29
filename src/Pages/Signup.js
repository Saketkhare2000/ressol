import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import LogIn from "../Components/LogIn";
import SignUp from "../Components/Signup";
import { WebContext } from "../Context/WebContext";

const Signup = () => {
  const { loggedIn, isLoggedIn } = useContext(WebContext);
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div className="page">
        {!loggedIn ? <SignUp /> : <LogIn />}
      </motion.div>
    </AnimatePresence>
  );
};

export default Signup;
