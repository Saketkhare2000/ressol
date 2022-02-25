import React, { useContext, useState } from "react";
import { WebContext } from "../../Context/WebContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import "../../Components/OTPHandle/style.css";
import toast from "react-hot-toast";
const OTPHandle = () => {
  const dispatch = useDispatch();
  const { phoneNumber, setPhoneNumber, setAlert, base_url, loggedIn, setLoggedIn } =
    useContext(WebContext);
  const [otp, setOtp] = useState("");
  let navigate = useNavigate();
  // const loggedIn = useSelector((state) => state.auth.loggedIn);

  const otpdetails = {
    phone: phoneNumber,
    OTP: parseInt(otp),
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${base_url}api/otp/callback/`,
      data: otpdetails,
    })
      .then((res) => {
        toast.success("OTP Verified Successfully");

        // setLoggedIn(true);
        dispatch({ type: "LOGGED_IN" });
        Cookies.set("loggedIn", true);
        Cookies.set("phonenumber", phoneNumber);

        navigate("/dashboard");
        window.location.reload(false);
      })
      .catch((err) => {
        toast.error("Incorrect OTP. Retry Logging in");

        navigate("/login");
      });
  };

  return (
    <div className="page">
      <div className="login-page page">
        <div className="login-card">
          <h2>Verification</h2>
          <p>Enter 3-digit OTP sent to your mobile number </p>
          <form className="login-form" action="">
            <div className="form-category otp-input">
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
  );
};

export default OTPHandle;
