import React, { useState, useEffect } from "react";
import "../Styles/Footer.css";
import nav from "../assets/Projectpic/nav.jpg";
import axios from "axios"
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaStar,
} from "react-icons/fa";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (rating === 0) {
    alert("⭐ Please select a rating before submitting!");
    return;
  }

  setLoading(true);
  try {
    const response = await axios.post("http://localhost:5000/api/Feedback", {
      name,
      email,
      message,
      rating,
    });

    if (response.status === 201 || response.status === 200) {
      alert("✅ Feedback submitted successfully!");
      setName("");
      setEmail("");
      setMessage("");
      setRating(0);
    } else {
      alert("❌ Error: " + response.data.message);
    }
  } catch (error) {
    console.error("Error submitting feedback:", error);
    if (error.response) {
      alert(`⚠️ ${error.response.data.message || "Server error occurred!"}`);
    } else {
      alert("⚠️ Could not connect to server!");
    }
  } finally {
    setLoading(false);
  }
};


  // Highlight effect when navigated from navbar
  useEffect(() => {
    const handleHighlight = () => {
      const hash = window.location.hash;
      if (hash === "#feedback") {
        setHighlight(true);
        setTimeout(() => setHighlight(false), 2000);
      }
    };
    handleHighlight();
    window.addEventListener("hashchange", handleHighlight);
    return () => window.removeEventListener("hashchange", handleHighlight);
  }, []);

  return (
    <footer
      id="footer-feedback"
      className="footer"
      style={{
        backgroundImage: `url(${nav})`,
      }}
    >
      <div className="footer-overlay">
        <div className="footer-container">
          {/* About Section */}
          <div className="footer-section about">
            <h2 className="footer-title">RentedBike</h2>
            <p>
              Explore the joy of riding with RentedBike. Affordable, reliable,
              and stylish bikes for your next adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/bikes">Bikes</a></li>
              <li><a href="/offers">Offers</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section contact">
            <h3>Contact</h3>
            <p>📍 Bhubaneswar, India</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@rentedbike.com</p>
          </div>

          {/* Feedback Form */}
          <div className={`footer-section feedback ${highlight ? "highlight" : ""}`}>
            <h3>Feedback</h3>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                placeholder="Your Feedback"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              {/* ⭐ Star Rating Section */}
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={ratingValue}
                      size={25}
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#ccc"}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                      style={{ cursor: "pointer", marginRight: "5px" }}
                    />
                  );
                })}
              </div>

              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Social Media Links */}
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RentedBike. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
