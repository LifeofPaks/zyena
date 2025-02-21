import { useEffect, useState } from "react";
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
import Admin from "./pages/Admin";
import { useDispatch } from "react-redux";
import { hydrate } from "./store/auth-slice";
import Contacts from "./pages/admin/ContactList";
import ContactList from "./pages/admin/ContactList";
import ConsultationList from "./pages/admin/ConsultationList";
import Dashboard from "./pages/admin/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./components/Footer";

const theme = createTheme({
  typography: {
    fontFamily: `"Montserrat", "Arial", sans-serif`,
  },
});

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/sign-up" ||
    location.pathname === "/admin" ||
    location.pathname === "/admin/contacts" ||
    location.pathname === "/admin/consultations" ||
    location.pathname === "/admin/dashboard";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrate());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isAuthPage && <ChatBot />}
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="consultation" element={<Consultations />} />
        <Route path="shop" element={<Shop />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="prom-dresses" element={<PromDresses />} />
        <Route path="evening-dresses" element={<EveningDresses />} />
        <Route path="bridal" element={<Bridal />} />
        <Route path="valorous" element={<Valorous />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<Admin />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contacts" element={<ContactList />} />
          <Route path="consultations" element={<ConsultationList />} />
        </Route>
      </Routes>
      {!isAuthPage && <ScrollTop />}
      {!isAuthPage &&  <Footer/>}
     
    </ThemeProvider>
  );
}

export default App;
