import React from 'react';
import Button from '../Button';
import "./style.css";
// import { AnimatePresence, motion } from "framer-motion";
// import { slideUp } from "../../Animation";

const Dashoard = () => {
  return (
    <div className='dashboard-page'>
        <div className="dashboard-header">
        <h3 className='mobile-title'>Dashboard</h3>
        <Button title="Edit" variant="secondary" />
        </div>
        <form action="">
            <div className="form-group">
                <label htmlFor="select">Name</label>
                <input type="text" placeholder="Name" value="Akarsh Shrivastava"/>
            </div>
            <div className="form-group">
                <label htmlFor="select">Email</label>
                <input type="text" placeholder="Email" value="akarsh9424@gmail.com"/>
            </div>
            <div className="form-group">
                <label htmlFor="select">Phone</label>
                <input type="text" placeholder="Phone" value="9876543210"/>
            </div>
            <div className="form-group">
                <label htmlFor="select">Address</label>
                <input type="text" placeholder="Address" value="Address"/>
            </div>
            <div className="form-group">
                <label htmlFor="select">Pincode</label>
                <input type="text" placeholder="Pincode" value="654321"/>
            </div>
            <div className="form-group">
                <label htmlFor="select">City</label>
                <input type="text" placeholder="City" value="Jabalpur"/>
            </div>
            <div className="form-group">
                <label htmlFor="select">State</label>
                <input type="text" placeholder="State" value="Madhya Pradesh"/>
            </div>
            <div className="form-group">
                <label htmlFor="select">Country</label>
                <input type="text" placeholder="Country" value="India"/>
            </div>
            <div className="form-group">
                <label htmlFor="select">Password</label>
                <input type="text" placeholder="Password" value="akarsh123"/>
            </div>
        </form>
    </div>
  );
};

export default Dashoard;
