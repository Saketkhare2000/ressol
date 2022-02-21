import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import Button from "../Button";
import Filter from "../Filter";
import "./style.css";
import { pageSlideLeft, subMenuAnimate } from "../../Animation";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineDown,
  AiFillCaretDown,
} from "react-icons/ai";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { filter, setFilter } = useContext(WebContext);
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [hover, setIsHover] = useState(false);
  const toggleMouseMenu = () => {
    setIsHover(!hover);
    console.log("hover");
  };
  return (
    <motion.header>
      {filter ? (
        <Filter />
      ) : (
        <>
          <motion.nav className="navbar">
            <div className="top-header">
              <motion.div className="logo">
                <Link to="/">9Roof</Link>
              </motion.div>
              <motion.ul className="top-navLinks">
                <Link to="/">
                  <li className="top-navLink">Home</li>
                </Link>
                <motion.div
                  onMouseEnter={toggleMouseMenu}
                  onMouseLeave={toggleMouseMenu}
                  className="div"
                >
                  <motion.li className="top-navLink">
                    Dashboard <AiFillCaretDown />
                    <motion.div className={hover ? "menu-item" : "hidden"}>
                      <motion.div
                        className="sub-menu"
                        initial="exit"
                        animate={hover ? "enter" : "exit"}
                        variants={subMenuAnimate}
                      >
                        {!loggedIn ? (
                          <div className="sub-menu-container">
                            <Link to="/login">
                              <div className="sub-menu-item">Login</div>
                            </Link>
                            <Link to="/signup">
                              <div className="sub-menu-item">Sign up</div>
                            </Link>
                            <Link to="/prime">
                              <div className="sub-menu-item">Prime</div>
                            </Link>
                          </div>
                        ) : (
                          <div className="sub-menu-container">
                            <Link to="/dashboard">
                              <div className="sub-menu-item">Dashboard</div>
                            </Link>
                            <Link to="/prime">
                              <div className="sub-menu-item">Prime</div>
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.li>
                </motion.div>

                <Link to="/post">
                  <li className="top-navLink post-property-btn btn btn-secondary">
                    Post Property
                  </li>
                </Link>
              </motion.ul>
              <button
                onClick={() => navigate("/prime")}
                className="btn btn-outline prime-btn"
              >
                Prime
              </button>
            </div>
            {/* <div className="search-bar">
              <motion.div onClick={() => navigate("/filter")} className="input">
                Search for Properties
              </motion.div>
            </div> */}
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
                <Button title="Post Property" variant="secondary" />
              </Link>
              <Link to={loggedIn ? `dashboard` : `signup`}>
                <motion.li
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <AiOutlineUser style={{ fontSize: "24px" }} />
                  Dashboard
                </motion.li>
              </Link>
            </ul>
          </motion.nav>
        </>
      )}
    </motion.header>
  );
};

export default Navbar;
