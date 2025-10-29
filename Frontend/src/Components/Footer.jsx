import React, { useState } from "react";
import "../Styles/Footer.css";
import nav from "../assets/Projectpic/nav.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Feedback submitted successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      className="footer"
      style={{
        backgroundImage: `url(${nav})`,
      }}
    >
      <div className="footer-overlay">
        <div className="footer-container">
          {/* About */}
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

          {/* Contact */}
          <div className="footer-section contact">
            <h3>Contact</h3>
            <p>📍 Bhubaneswar, India</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ support@rentedbike.com</p>
          </div>

          {/* Feedback Form */}
          <div className="footer-section feedback">
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
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          {/* Social Media */}
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
