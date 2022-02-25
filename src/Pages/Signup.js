import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import LogIn from "../Components/LogIn";
import SignUp from "../Components/Signup";
import { WebContext } from "../Context/WebContext";

const Signup = () => {
  const { loggedIn, isLoggedIn } = useContext(WebContext);
  useEffect(()=>{
    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  },[])
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div className="page">
        {!loggedIn ? <SignUp /> : <LogIn />}
      </motion.div>
    </AnimatePresence>
  );
};

export default Signup;
