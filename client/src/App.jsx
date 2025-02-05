import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollToTop";
import Gallery from "./pages/Gallery";
import Consultations from "./pages/Consultations";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Shop from "./pages/Shop";
import { Home } from "./pages/Home";
import Bridal from "./pages/Bridal";
import EveningDresses from "./pages/EveningDresses";
import PromDresses from "./pages/PromDresses";
import Valorous from "./pages/Valorous";
import ChatBot from "./components/ChatBot";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/sign-up";

  return (
    <>
      <ChatBot />
      <ScrollTop />
      {!isAuthPage && <Navbar />} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="consultations" element={<Consultations />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="prom-dresses" element={<PromDresses />} />
        <Route path="evening-dresses" element={<EveningDresses />} />
        <Route path="bridal" element={<Bridal />} />
        <Route path="valorous" element={<Valorous />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
