import React, { useEffect, useContext } from "react";
import "../Prime/style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WebContext } from "../../Context/WebContext";
import { getUserData } from "../../actions/userActions";
import { FaCrown } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// const server = "http://localhost:8000";

const Prime = () => {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userData.userData);
  // const userDetails = useSelector((state) => state.userData);
  const isPrime = useSelector(
    (state) => state.userData.userData.prime_status.is_prime
  );

  const dispatch = useDispatch();
  // const { userName } = useContext(WebContext);
  const { firstname, lastname, phoneNumber, base_url, loggedIn } = useContext(WebContext);
  useEffect(() => {
    // dispatch(getUserData(userName, key));
    dispatch(getUserData(phoneNumber));
  }, []);
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await axios({
        url: `${base_url}api/pay/callback/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          toast.success("Congratulations! Payment Successful");

          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Payment Failed");

          navigate("/dashboard");
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async (subscription_type) => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("user", userDetails.id);
    bodyData.append("subscription_type", subscription_type);

    const data = await axios({
      url: `${base_url}api/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    var options = {
      key_id: "rzp_test_fZKYjMuBhXDFuk",
      key_secret: "NZKM6V0kgO4rpTvcGeFCXkSV",
      amount: data.data.payment.amount,
      currency: "INR",
      name: "9Roof",
      description: `${subscription_type} Subscription`,
      image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePayment method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: `${firstname} ${lastname}`,
        contact: `${phoneNumber}`,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#059862",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return !isPrime ? (
    <div className="prime-page page">
      <FaCrown />
      <h2> 9Roof Prime Membership</h2>
      <p className="prime-description">Perfect way for <strong>Agents</strong>  to increase their reach </p>
      <div className="prime-plans-container">
        {/* Basic Plan  */}
        <div className="prime-plan">
          <h3>Basic</h3>
          <div className="prime-plan-price">
            <h2>&#8377;49</h2>
            <span>/month</span>
          </div>
          <div className="prime-plan-features">
            <ul>
              <li>
                <p>Number of Owners you can contact</p>
                <span>15</span>
              </li>
              <li>
                <p>Plan Validity (days)</p>
                <span>30</span>
              </li>
            </ul>
          </div>
          <div className="prime-plan-button" onClick={showRazorpay}>
            <button
              className="btn btn-secondary"
              onClick={() => showRazorpay("Basic")}
            >
              Continue
            </button>
          </div>
        </div>
        {/* Pro Plan  */}
        <div className="prime-plan">
          <h3>Pro</h3>
          <div className="prime-plan-price">
            <h2>&#8377;249</h2>
            <span>/month</span>
          </div>
          <div className="prime-plan-features">
            <ul>
              <li>
                <p>Number of Owners you can contact</p>
                <span>35</span>
              </li>
              <li>
                <p>Plan Validity (days)</p>
                <span>60</span>
              </li>
            </ul>
          </div>
          <div className="prime-plan-button">
            <button
              className="btn btn-primary"
              onClick={() => showRazorpay("Pro")}
            >
              Continue
            </button>
          </div>
        </div>
        {/* Premium Plan  */}
        <div className="prime-plan">
          <h3>Premium</h3>
          <div className="prime-plan-price">
            <h2>&#8377;499</h2>
            <span>/month</span>
          </div>
          <div className="prime-plan-features">
            <ul>
              <li>
                <p>Number of Owners you can contact</p>
                <span>99</span>
              </li>
              <li>
                <p>Plan Validity (days)</p>
                <span>90</span>
              </li>
            </ul>
          </div>
          <div className="prime-plan-button">
            <button
              className="btn btn-secondary"
              onClick={() => showRazorpay("Premium")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="prime-page page">
      <FaCrown />
      <h2>Thankyou</h2>
      <p className="already-prime">You are already a Prime Member</p>
      <p className="visit-again">You may visit again when your subscription expires</p>
      <button
        style={{ margin: "10px auto", display: "block" }}
        className="btn btn-primary"
        onClick={() => navigate("/dashboard")}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Prime;
