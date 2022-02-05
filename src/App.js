//import global css
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Switch } from "react-router";
import "../src/Styles/global.css";
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
import { Example } from "./Components/Carousel/Example";
import PrimeRoute from "./Routes/PrimeRoute";
function App() {
  return (
    <WebProvider>
      <BrowserRouter>
        <Nav />
        <Spacer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/post" element={<Post />} />
          <Route path="/property" element={<Property />} />
          <Route path="/propertylist" element={<PropertyList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <PrimeRoute path="/admin" element={<Example />} /> */}
        </Routes>
        <Footer />
        <Spacer />
        <ScrollToTop />
      </BrowserRouter>
    </WebProvider>
  );
}

export default App;
