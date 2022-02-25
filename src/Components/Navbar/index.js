import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import Button from "../Button";
import Filter from "../Filter";
import "./style.css";
import { subMenuAnimate } from "../../Animation";
import { AiOutlineHome, AiOutlineUser, AiFillCaretDown } from "react-icons/ai";
import { FaCrown } from 'react-icons/fa';
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
const Navbar = () => {
  const { filter, setAlert } = useContext(WebContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const loggedIn = useSelector((state) => state.auth.loggedIn);
  const loggedIn = Cookies.get('loggedIn') === 'true' ? true : false;

  const [hover, setIsHover] = useState(false);
  const toggleMouseMenu = () => {
    setIsHover(!hover);
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
                <Link to="/prime">
                  <li className="top-navLink"><FaCrown />Prime</li>
                </Link>
                <motion.div
                  onMouseEnter={toggleMouseMenu}
                  onMouseLeave={toggleMouseMenu}
                  className="top-navLink"
                >
                  <motion.li className="dropdown-link">
                    Account <AiFillCaretDown />
                  </motion.li>
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
                          {/* <Link to="/prime">
                            <div className="sub-menu-item">Prime</div>
                          </Link> */}
                        </div>
                      ) : (
                        <div className="sub-menu-container">
                          <Link to="/dashboard">
                            <div className="sub-menu-item">Dashboard</div>
                          </Link>
                          <Link to="/dashboard/manage-properties">
                            <div className="sub-menu-item">Manage Properties</div>
                          </Link>
                          <Link to="/dashboard/view-responses">
                            <div className="sub-menu-item">View Responses</div>
                          </Link>
                          <Link to="/dashboard/wishlist">
                            <div className="sub-menu-item">Wishlist</div>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>

                <Link to="/post">
                  <li className="top-navLink post-property-btn btn btn-secondary">
                    Post Property
                  </li>
                </Link>
              </motion.ul>
              <div
                className="prime-btn"
                onClick={() => navigate("/prime")}
              >
                <FaCrown />
                Prime
              </div>
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
