import React from 'react'

const OTPHandle = () => {
  return (
    <div className='page'>
      <div className="login-page page">
        <div className="login-card">
          <h2>Verification</h2>
          <form className="login-form" action="">
            <div className="form-category">
              <input
                id="phone"
                type="text"
                placeholder="XXXX"
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