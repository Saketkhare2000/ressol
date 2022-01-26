import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import Button from "../Button";
import Filter from "../Filter";
import "./style.css";
import { pageSlide, pageSlideLeft } from "../../Animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
const Navbar = () => {
  const { filter, setFilter, loggedIn } = useContext(WebContext);

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
                  <AiOutlineHome style={{ fontSize: "32px" }} />
                  Home
                </motion.li>
              </Link>
              <Link to="/">
                <Button title="Post Property" variant="primary" />
              </Link>
              <Link to={`signup`}>
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <AiOutlineUser style={{ fontSize: "32px" }} />
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
