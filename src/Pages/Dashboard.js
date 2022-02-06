import React, { useContext, useEffect } from "react";
import "../Styles/dashboard.css";
import { WebContext } from "../Context/WebContext";
import SampleUserImg from "../assets/images/sample-user-img.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../actions/userActions";

// import { AnimatePresence, motion } from "framer-motion";
// import { slideUp } from "../../Animation";

const Dashoard = () => {
  const dispatch = useDispatch();
  const { userName } = useContext(WebContext);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const userDetails = useSelector((state) => state.userData.userData);
  console.log(userDetails.userData);
  useEffect(() => {
    dispatch(getUserData(userName, accessToken));
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="user-image">
          <img src={SampleUserImg} alt="User" />
        </div>
        <div className="user-details">
          <h3 className="mobile-title">{userDetails.first_name}</h3>
          <p className="user-prime-status">Prime Member</p>
        </div>
      </div>
      <form action="">
        <div className="form-group">
          <label htmlFor="select">Name</label>
          <input type="text" placeholder="Name" value={userDetails.username} />
        </div>
        <div className="form-group">
          <label htmlFor="select">Email</label>
          <input type="text" placeholder="Email" value={userDetails.email} />
        </div>
        <div className="form-group">
          <label htmlFor="select">Phone</label>
          <input
            type="text"
            placeholder="Phone"
            value={userDetails.mobile_number}
          />
        </div>
        <div className="form-group">
          <label htmlFor="select">Address</label>
          <input
            type="text"
            placeholder="Address"
            value={userDetails.address}
          />
        </div>
        <div className="form-group">
          <label htmlFor="select">Pincode</label>
          <input
            type="text"
            placeholder="Pincode"
            value={userDetails.pincode}
          />
        </div>
        <div className="form-group">
          <label htmlFor="select">City</label>
          <input type="text" placeholder="City" value={userDetails.city} />
        </div>
        {/* <div className="form-group">
                    <label htmlFor="select">State</label>
                    <input type="text" placeholder="State" value="Madhya Pradesh" />
                </div> */}
        {/* <div className="form-group">
                    <label htmlFor="select">Country</label>
                    <input type="text" placeholder="Country" value="India" />
                </div> */}
        <div className="form-group">
          <label htmlFor="select">Password</label>
          <input
            type="text"
            placeholder="Password"
            value={userDetails.password}
          />
        </div>
      </form>
    </div>
  );
};

export default Dashoard;
