//import global css
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/Styles/global.css";
import Button from "./Components/Button";
import Footer from "./Components/Footer";
import LogIn from "./Components/LogIn";
import Nav from "./Components/Navbar";
import WebProvider from "./Context/WebContext";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";

function App() {
  return (
    <WebProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </WebProvider>
  );
}

export default App;
