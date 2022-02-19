import React from 'react'
import "../../Components/OTPHandle/style.css";
const OTPHandle = () => {
  return (
    <div className='page'>
      <div className="login-page page">
        <div className="login-card">
          <h2>Verification</h2>
          <form className="login-form" action="">
            <div className="form-category otp-input" >
              <input
                id="phone"
                type="text"
                placeholder="Enter XXXX OTP"

              />
            </div>
            <button
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OTPHandle