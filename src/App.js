//import global css
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import "../src/Styles/global.css";
import Filter from "./Components/Filter";
import Footer from "./Components/Footer";
import LogIn from "./Components/LogIn";
import Dashboard from "./Components/Dashboard";
import Nav from "./Components/Navbar";
import WebProvider from "./Context/WebContext";
import { WebContext } from "./Context/WebContext";
import AboutUs from "./Components/AboutUs";
import ContactUs from "./Components/ContactUs";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Signup from "./Pages/Signup";
import Property from "./Components/Property";
import Spacer from "./Components/Spacer";
import PropertyList from "./Pages/PropertyList";
import ScrollToTop from "./ScrollToTop";
import { useSelector } from "react-redux";
import CompleteProfile from "./Components/CompleteProfile";
import ProfileDetails from "./Components/ProfileDetails";
import ManageProperties from "./Components/ManageProperties";
import Wishlist from "./Components/Wishlist";
import Prime from "./Components/Prime";
import EditProperty from "./Components/EditProperty";
import ViewResponse from "./Components/ViewResponse";
import OTPHandle from "./Components/OTPHandle";
import TransactionHistory from "./Components/TransactionHistory";
import Cookies from "js-cookie";
import axios from "axios";
// import { WebContext } from "../src/Context/WebContext";
// import { useContext } from "react";

function App() {
  // const loggedIn = useSelector((state) => state.auth.loggedIn);

  // const loggedIn = Cookies.get('loggedIn') === 'true' ? true : false;
  const loggedInCookie = Cookies.get('loggedIn') === 'true' ? true : false;
  const [loggedIn, setLoggedIn] = useState(loggedInCookie);
  console.log(loggedIn)

  // Latitude and Longitude
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // const API_Endpoint = `https://maps.googleapis.com/maps/api/geocode/json?`
  // const API_Key = "AIzaSyAsy3W9iw5U0jnI3T7B0sBeoiXD2GH6RIg"
  useEffect(() => {
    setLoggedIn(loggedInCookie);
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    // let finalAPIEndPoint = `${API_Endpoint}latlng=${latitude},${longitude}&key=${API_Key}`;
    // axios.get(finalAPIEndPoint).then(res => {
    //   console.log(res.data);
    // }
    // )
  }, []);
  console.log(latitude)
  console.log(longitude)


  // GeoLocation

  // navigator.geolocation.getCurrentPosition((position) => {
  //   console.log(position.coords);
  //   setLatitude(position.coords.latitude);
  //   setLongitude(position.coords.longitude);
  // });

  // const { loggedIn } = useContext(WebContext);
  // console.log(loggedIn)

  return (
    <WebProvider>
      <BrowserRouter>
        <Nav />
        <Spacer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/completeprofile" element={<CompleteProfile />} />
          <Route path="/property/:slug" element={<Property />} />
          <Route path="/propertylist/:slug" element={<PropertyList />} />
          {loggedIn ? (
            <Route path="/login" element={<Dashboard />} />
          ) : (
            <Route path="/login" element={<LogIn />} />
          )}
          {loggedIn ? (
            <Route path="/signup" element={<Dashboard />} />
          ) : (
            <Route path="/signup" element={<Signup />} />
          )}
          {loggedIn ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/dashboard" element={<LogIn />} />
          )}
          {/* {loggedIn ? (
            <Route path="/post" element={<Post />} />
          ) : (
            <Route path="/dashboard" element={<LogIn />} />
          )} */}
          <Route path="/post" element={<Post />} />

          {loggedIn ? (
            <Route
              path="/dashboard/profile-details"
              element={<ProfileDetails />}
            />
          ) : (
            <Route path="/dashboard/profile-details" element={<LogIn />} />
          )}
          {loggedIn ? (
            <Route
              path="/dashboard/manage-properties"
              element={<ManageProperties />}
            />
          ) : (
            <Route path="/dashboard/manage-properties" element={<LogIn />} />
          )}
          {loggedIn ? (
            <Route path="/dashboard/wishlist" element={<Wishlist />} />
          ) : (
            <Route path="/dashboard/wishlist" element={<LogIn />} />
          )}
          {loggedIn ? (
            <Route
              path="/dashboard/view-responses"
              element={<ViewResponse />}
            />
          ) : (
            <Route path="/dashboard/view-responses" element={<LogIn />} />
          )}
          <Route path="filter" element={<Filter />} />
          <Route path="/prime" element={<Prime />} />
          <Route
            path="/dashboard/manage-properties/edit-property/"
            element={<EditProperty />}
          />
          <Route
            path="/dashboard/transaction-history"
            element={<TransactionHistory />}
          />
          <Route path="/otphandle" element={<OTPHandle />} />
        </Routes>
        <Spacer />
        <Footer />
        <ScrollToTop />
      </BrowserRouter>
    </WebProvider>
  );
}

export default App;
