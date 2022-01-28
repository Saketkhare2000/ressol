//import global css
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/Styles/global.css";
import Footer from "./Components/Footer";
import LogIn from "./Components/LogIn";
import Nav from "./Components/Navbar";
import WebProvider from "./Context/WebContext";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Post from "./Pages/Post";
import Signup from "./Pages/Signup";
import Property from "./Components/Property";
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
          <Route path="/post" element={<Post />} />
          <Route path="/property" element={<Property />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </WebProvider>
  );
}

export default App;
