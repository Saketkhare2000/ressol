import React, { useContext, useEffect } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { WebContext } from "../../Context/WebContext";
import SampleUserImg from "../../assets/images/sample-user-img.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../actions/userActions";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { IoCaretUpCircleSharp } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";

// import { AnimatePresence, motion } from "framer-motion";
// import { slideUp } from "../../Animation";

const Dashoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName } = useContext(WebContext);
  console.log(userName)
  // const accessToken = useSelector((state) => state.auth.accessToken);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const key = useSelector((state) => state.auth.key);
  const userDetails = useSelector((state) => state.userData.userData);
  console.log(userDetails.userData);
  useEffect(() => {
    dispatch(getUserData(userName, key));
  }, []);
  //rotate state

  const [rotate, setRotate] = React.useState(false);

  //logout dispatcher
  const logout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGGED_OUT" });
    dispatch({ type: "CLEAR_USER_DATA" });
  };

  return loggedIn ? (
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
      <AnimateSharedLayout>
        <motion.div className="disclosure-btn" layout>
          <motion.div
            onClick={() => setRotate(!rotate)}
            layout
            className="btn-top"
          >
            <motion.p layout>
              <AiOutlineUser style={{ fontSize: "20px" }} />
              User Details
            </motion.p>
            <IoCaretUpCircleSharp
              className={`${rotate ? "down-icon " : "down-icon toggle"}`}
            />
          </motion.div>
          <AnimatePresence>
            {rotate && (
              <DetailsDropdown
                rotate={setRotate}
                layout
                userDetails={userDetails}
              />
            )}
          </AnimatePresence>
        </motion.div>
        {/*  */}
      </AnimateSharedLayout>
      <button className="btn" onClick={logout}>
        Log Out
      </button>
    </div>
  ) : (
    <>
      {navigate("/login")}
    </>
  );
};

export default Dashoard;

const DetailsDropdown = ({ userDetails }) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
      transition={{ ease: "easeInOut", staggerChildren: 0.2 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      layout
      className="disclosure-panel"
      action=""
    >
      <motion.div layout className="form-group">
        <label htmlFor="select">Name</label>
        <input type="text" placeholder="Name" value={userDetails.username} />
      </motion.div>
      <motion.div layout className="form-group">
        <label htmlFor="select">Email</label>
        <input type="text" placeholder="Email" value={userDetails.email} />
      </motion.div>
      <motion.div layout className="form-group">
        <label htmlFor="select">Phone</label>
        <input
          type="text"
          placeholder="Phone"
          value={userDetails.mobile_number}
        />
      </motion.div>
      <motion.div layout className="form-group">
        <label htmlFor="select">Address</label>
        <input type="text" placeholder="Address" value={userDetails.address} />
      </motion.div>
      <motion.div layout className="form-group">
        <label htmlFor="select">Pincode</label>
        <input type="text" placeholder="Pincode" value={userDetails.pincode} />
      </motion.div>
      <motion.div layout className="form-group">
        <label htmlFor="select">City</label>
        <input type="text" placeholder="City" value={userDetails.city} />
      </motion.div>
      {/* <div className="form-group">
                    <label htmlFor="select">State</label>
                    <input type="text" placeholder="State" value="Madhya Pradesh" />
                </div> */}
      {/* <div className="form-group">
                    <label htmlFor="select">Country</label>
                    <input type="text" placeholder="Country" value="India" />
                </div> */}
      <motion.div layout className="form-group">
        <label htmlFor="select">Password</label>
        <input
          type="text"
          placeholder="Password"
          value={userDetails.password}
        />
      </motion.div>
    </motion.form>
  );
};
