import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WebContext } from "../Context/WebContext";
import "../Styles/nav.css";
const Nav = () => {
  const { loggedIn, setLoggedIn } = useContext(WebContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {loggedIn ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
