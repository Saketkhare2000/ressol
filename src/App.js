//import global css
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/Styles/global.css";
import Filter from "./Components/Filter";
import Footer from "./Components/Footer";
import LogIn from "./Components/LogIn";
import Dashboard from "./Components/Dashboard";
import Nav from "./Components/Navbar";
import WebProvider from "./Context/WebContext";
import About from "./Pages/About";
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
function App() {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <WebProvider>
      <BrowserRouter>
        <Nav />
        <Spacer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/completeprofile" element={<CompleteProfile />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/post" element={<Post />} />
          <Route path="/property/:slug" element={<Property />} />
          <Route path="/propertylist/:slug" element={<PropertyList />} />
          {loggedIn ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/dashboard" element={<LogIn />} />
          )}
          <Route path="/dashboard" element={<Dashboard />} />
          {loggedIn ? (
            <Route path="/dashboard/profile-details" element={<ProfileDetails />} />
          ) : (
            <Route path="/dashboard/profile-details" element={<LogIn />} />
          )}
          <Route path="filter" element={<Filter />} />
        </Routes>
        {/* <Footer /> */}
        <Spacer />
        <ScrollToTop />
      </BrowserRouter>
    </WebProvider>
  );
}

export default App;
