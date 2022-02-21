import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import SampleUserImg from "../../assets/images/sample-user-img.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../actions/userActions";
import { motion } from "framer-motion";
import { IoCaretUpCircleSharp } from "react-icons/io5";
import { AiOutlineUser, AiOutlineBook } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import { GrContact } from "react-icons/gr";
import Select from 'react-select'

const Dashoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { userName } = useContext(WebContext);
  const { phoneNumber } = useContext(WebContext);

  useEffect(() => {
    // dispatch(getUserData(userName, key));
    dispatch(getUserData(phoneNumber));
  }, []);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  // const key = useSelector((state) => state.auth.key);
  const userDetails = useSelector((state) => state.userData.userData);
  console.log(userDetails)
  console.log(phoneNumber)

  const options = [
    { value: '#059862', label: 'Default Green' },
    { value: '#f75590', label: 'Pink' },
    { value: '#85C7F2', label: 'Light Sky Blue' },
    { value: '#BA2D0B', label: 'Orange' },
    { value: '#083D77', label: 'Indigo' },
    { value: '#3a3a3a', label: 'Black' }
  ]


  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGGED_OUT" });
    dispatch({ type: "CLEAR_USER_DATA" });
  };

  const handleStateChange = (color) => {
    document.documentElement.style.setProperty('--brand--green', color.value)
  }

  const NavigateTo = (path) => {
    navigate(path);
  };

  return loggedIn ? (
    <div className="dashboard-page page">
      <div className="dashboard-desktop">
        <div className="dashboard-header">
          <div className="user-image">
            {userDetails.image == null ? (
              <img src={SampleUserImg} alt="user" />
            ) : (
              <img src={userDetails.image.image.full_size} alt="user" />
            )}
          </div>
          <div className="user-details">
            <h3 className="mobile-title">{userDetails.first_name} {userDetails.last_name}</h3>
            {userDetails.prime_status && userDetails.prime_status.is_prime ? <p className="user-prime-status">{userDetails.prime_status.subscription_type} Member</p> : <p className="user-prime-status">Buy Prime Membership</p>}
            <p className="contacts-remaining">
              No. of contacts remaining:  {userDetails.prime_status && userDetails.prime_status.is_prime ? <span>{userDetails.prime_status.counter_limit - userDetails.prime_status.contact_counter}</span> : <span>{5}</span>}
            </p>
            {userDetails.prime_status && userDetails.prime_status.is_prime ? <p className="validity">Valid For : {userDetails.prime_status.subscription_period} Days  </p> : <></>}
          </div>
        </div>
        <div className="btn-container">
          <Select options={options} placeholder="Choose Color" onChange={handleStateChange} className="choose-color" />
          <button className="btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
      <div className="dashboard-menus">
        <motion.div className="disclosure-btn" layout>
          <motion.div
            onClick={() => NavigateTo('/dashboard/profile-details')}
            layout
            className="btn-top"
          >
            <motion.p layout>
              <AiOutlineUser style={{ fontSize: "20px" }} />
              Profile Details
            </motion.p>
            <IoCaretUpCircleSharp
              className={`down-icon`}
            />
          </motion.div>
        </motion.div>
        <motion.div className="disclosure-btn" layout>
          <motion.div
            onClick={() => NavigateTo('/dashboard/manage-properties')}
            layout
            className="btn-top"
          >
            <motion.p layout>
              <BiBuildingHouse style={{ fontSize: "20px" }} />
              Manage Properties
            </motion.p>
            <IoCaretUpCircleSharp
              className={`down-icon`}
            />
          </motion.div>
        </motion.div>
        <motion.div className="disclosure-btn" layout>
          <motion.div
            onClick={() => NavigateTo('/dashboard/view-responses')}
            layout
            className="btn-top"
          >
            <motion.p layout>
              <GrContact style={{ fontSize: "20px" }} />
              View Responses
            </motion.p>
            <IoCaretUpCircleSharp
              className={`down-icon`}
            />
          </motion.div>
        </motion.div>
        <motion.div className="disclosure-btn" layout>
          <motion.div
            onClick={() => NavigateTo('/dashboard/wishlist')}
            layout
            className="btn-top"
          >
            <motion.p layout>
              <AiOutlineBook style={{ fontSize: "20px" }} />
              Wishlist
            </motion.p>
            <IoCaretUpCircleSharp
              className={`down-icon`}
            />
          </motion.div>
        </motion.div>
      </div>
      <div className="btn-container">
        <Select options={options} placeholder="Choose Color" onChange={handleStateChange} />
        <button className="btn" onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  ) : (
    <>
      {navigate("/login")}
    </>
  );
};

export default Dashoard;
