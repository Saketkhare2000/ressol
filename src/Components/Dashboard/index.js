import React, { useContext } from 'react';
import Button from '../Button';
import "./style.css";
import { WebContext } from "../../Context/WebContext";
import SampleUserImg from "../../assets/images/sample-user-img.png";

// import { AnimatePresence, motion } from "framer-motion";
// import { slideUp } from "../../Animation";

const Dashoard = () => {
    const { userData, loggedIn } = useContext(WebContext);
    return (
        <div className='dashboard-page'>
            <div className="dashboard-header">
               <div className="user-image">
                   <img src={SampleUserImg} alt="User" />
               </div>
               <div className="user-details">
                   <h3 className='mobile-title'>{userData.name}</h3>
                   <p className='user-prime-status'>Prime Member</p>
               </div>
            </div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="select">Name</label>
                    <input type="text" placeholder="Name" value={userData.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="select">Email</label>
                    <input type="text" placeholder="Email" value={userData.email} />
                </div>
                <div className="form-group">
                    <label htmlFor="select">Phone</label>
                    <input type="text" placeholder="Phone" value={userData.mobile_number} />
                </div>
                <div className="form-group">
                    <label htmlFor="select">Address</label>
                    <input type="text" placeholder="Address" value={userData.address} />
                </div>
                <div className="form-group">
                    <label htmlFor="select">Pincode</label>
                    <input type="text" placeholder="Pincode" value={userData.pincode} />
                </div>
                <div className="form-group">
                    <label htmlFor="select">City</label>
                    <input type="text" placeholder="City" value={userData.city} />
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
                    <input type="text" placeholder="Password" value={userData.password} />
                </div>
            </form>
        </div>
    );
};

export default Dashoard;
