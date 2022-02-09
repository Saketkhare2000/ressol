import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import Button from "../Button";
import Filter from "../Filter";
import "./style.css";
import { pageSlideLeft } from "../../Animation";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { filter, setFilter } = useContext(WebContext);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <motion.header>
      {filter ? (
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          <Filter />
        </AnimatePresence>
      ) : (
        <AnimatePresence initial={false} exitBeforeEnter={true}>
          <motion.nav
            variants={pageSlideLeft}
            initial="show"
            animate="animate"
            exit="exit"
            className="navbar"
          >
            <div className="top-header">
              <div className="logo">
                <Link to="/">Reessol</Link>
              </div>
              <Button title="Prime" variant="outline" />
            </div>
            <div className="search-bar">
              <motion.div onClick={() => setFilter(!filter)} className="input">
                Search for Locality, Town or City
              </motion.div>
            </div>
          </motion.nav>

          <motion.nav className="navbar-bottom">
            <ul className="nav-links">
              <Link to="/">
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <AiOutlineHome style={{ fontSize: "24px" }} />
                  Home
                </motion.li>
              </Link>
              <Link to="/post">
                <Button title="Post Property" variant="primary" />
              </Link>
              <Link to={loggedIn ? `dashboard` : `signup`}>
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <AiOutlineUser style={{ fontSize: "24px" }} />
                  Account
                </motion.li>
              </Link>
            </ul>
          </motion.nav>
        </AnimatePresence>
      )}
    </motion.header>
  );
};

export default Navbar;
