import React, { useContext, useState } from 'react'
import { WebContext } from "../../Context/WebContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { userAuth } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

import "../../Components/OTPHandle/style.css";
const OTPHandle = () => {
  const dispatch = useDispatch();

  const { phoneNumber, setPhoneNumber, setAlert } = useContext(WebContext);
  const [otp, setOtp] = useState("");
  let navigate = useNavigate();
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const otpdetails = {
    phone: phoneNumber,
    OTP: parseInt(otp),
  };
  console.log(otpdetails)

  const verifyOTP = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8000/api/otp/callback/",
      data: otpdetails,
    }).then((res) => {
      console.log(res.data);
      setAlert({
        show: true,
        message: "OTP Verification Successful",
        type: "success",
      });
      setTimeout(() => {
        setAlert({
          show: false,
          message: "",
          type: "",
        });
      }, 4000);
      // setLoggedIn(true);
      dispatch({ type: "LOGGED_IN" });
      console.log(loggedIn)
      navigate("/dashboard")
    })
      .catch((err) => {
        console.log(err)
        setAlert({
          show: true,
          message: "Incorrect OTP. Retry Logging in",
          type: "danger",
        });
        setTimeout(() => {
          setAlert({
            show: false,
            message: "",
            type: "",
          });
        }, 4000);
        navigate("/login")
      })
  }



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
            <button className="btn btn-primary" onClick={(e) => verifyOTP(e)}>
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OTPHandle
