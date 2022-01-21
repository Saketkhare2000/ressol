//import global css
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/Styles/global.css";
import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
import WebProvider from "./Context/WebContext";
import About from "./Pages/About";
import Home from "./Pages/Home";

function App() {
  return (
    <WebProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </WebProvider>
  );
}

export default App;
