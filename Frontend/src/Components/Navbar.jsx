import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import "../Styles/Navbar.css";
import logo from "../assets/Picture/bike.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 
  // ✅ Check login status when route changes or localStorage updates
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Listen to login/logout from other components
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [location]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("🚪 Logged out successfully!");
    setIsLoggedIn(false);
    navigate("/");
    window.dispatchEvent(new Event("storage")); // 🔁 trigger Navbar update
  };

  // ✅ Smooth scroll to footer feedback
  const scrollToFeedback = () => {
    const footer = document.getElementById("footer-feedback");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/"); // if user not on home page, go home first
      setTimeout(() => {
        const footer = document.getElementById("footer-feedback");
        if (footer) footer.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };
  
   if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="App Logo" className="logo" />
        <h2 className="logo-text">College Bike Rentals</h2>
      </div>

      <div className="navbar-right">
        <a href="tel:+918448444897" className="navbar-call">
          <FaPhoneAlt size={14} />
          <span>+91-8448444897</span>
        </a>

        <ul className="nav-links">
          <li><Link to="/">UserDashboard</Link></li>
          <li><Link to="/offer">Offers</Link></li>
          <li><Link to="/home">Bike Rentals</Link></li>
          <li><Link to="/list-bike">List Your Vehicle</Link></li>

          {/* ✅ Feedback Button */}
          <li>
            <button onClick={scrollToFeedback} className="nav-link-feedback">
              Feedback
            </button>
          </li>

          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="nav-link-login logout-btn"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-link-login">
                Login
              </Link>
            )}
          </li>

          {!isLoggedIn && (
            <li>
              <Link to="/register" className="nav-link-register">
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
