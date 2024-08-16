import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Starter/Starter";
import About from "./components/About/About";
import Testimonial from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";
import BookingForm from "./components/BookingForm/BookingForm";
import CarList from "./components/CarList/CarList";
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoutes';

const App = () => {
  // dark mode start
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);
  // dark mode end

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route path="/" element={<><Hero theme={theme} /><About /><Testimonial /></>} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/about" element={<About />} />
          <Route path="/CarList" element={<CarList />} />
          <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
