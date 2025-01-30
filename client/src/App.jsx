import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollToTop";
import Gallery from "./pages/Gallery";
import Consultations from "./pages/Consultations";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Shop from "./pages/Shop";
import {Home}  from "./pages/Home";
import Bridal from "./pages/Bridal";
import EveningDresses from "./pages/EveningDresses";
import PromDresses from "./pages/PromDresses";




function App() {
  return (
    <>
    <ScrollTop/>
    <Navbar/>
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
    </Routes>
    </>
  );
}

export default App;
