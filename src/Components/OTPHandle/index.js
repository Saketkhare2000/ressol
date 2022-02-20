import React, { useContext, useState } from 'react'
import { WebContext } from "../../Context/WebContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import "../../Components/OTPHandle/style.css";
const OTPHandle = () => {
  const { phoneNumber, setPhoneNumber, setAlert } = useContext(WebContext);
  const [otp, setOtp] = useState("");
  let navigate = useNavigate();

  const otpdetails = {
    phone: phoneNumber,
    OTP: parseInt(otp),
  };
  console.log(otpdetails)


  return (
    <div className='page'>
      <div className="login-page page">
        <div className="login-card">
          <h2>Verification</h2>
          <p>Enter 3-digit OTP sent to your mobile number </p>
          <form className="login-form" action="">
            <div className="form-category otp-input" >
              <input
                id="phone"
                type="text"
                placeholder="Enter XXX OTP"
                required
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="btn btn-primary">
              Verify
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OTPHandle