// src/Pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import {
  MapPin, Calendar, Search, X, Layers, Bike,
  Wrench, Clock, CreditCard, BadgeIndianRupee
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import FAQItem from "../Components/FAQItem";
import "../Styles/UserDashboard.css";
import dash from "../assets/Projectpic/dash.jpg"; // ✅ Add background image import

// --- City Data ---
const popularCities = [
  { name: "Agartala", img: "https://placehold.co/150x150/EBF5FF/63B3ED?text=Agartala" },
  { name: "Agra", img: "https://placehold.co/150x150/FFF5F5/F56565?text=Agra" },
  { name: "Ahmedabad", img: "https://placehold.co/150x150/FEFCE8/ECC94B?text=Ahmedabad" },
  { name: "Bangalore", img: "https://placehold.co/150x150/EBF4FF/63B3ED?text=Bangalore" },
  { name: "Delhi", img: "https://placehold.co/150x150/FFF5F5/F56565?text=Delhi" },
  { name: "Chennai", img: "https://placehold.co/150x150/F0FFF4/48BB78?text=Chennai" },
];

function CitySelectModal({ isOpen, onClose, onSelectCity }) {
  const [searchTerm, setSearchTerm] = useState("");
  if (!isOpen) return null;
  const filteredCities = popularCities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="modal-backdrop">
      <div className="modal-container glass-card">
        <h2 className="modal-title">Select Your City</h2>
        <button onClick={onClose} className="close-btn"><X size={22} /></button>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="city-grid">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div key={city.name} className="city-card"
                onClick={() => {
                  onSelectCity(city.name);
                  onClose();
                }}
              >
                <img src={city.img} alt={city.name} />
                <p>{city.name}</p>
              </div>
            ))
          ) : ( <p className="no-city">No cities found.</p> )}
        </div>
      </div>
    </div>
  );
}

// --- FAQ Data ---
const faqData = [
  {
    question: "Is fuel included in the tariff?",
    answer: "No, fuel is not included. The bike will be provided with a full tank, and you must return it with a full tank.",
  },
  {
    question: "Can the bike booked be delivered to my home/office?",
    answer: "Yes, we offer doorstep delivery and pickup services. The charges vary depending on your location.",
  },
  {
    question: "How can I book a bike without seeing it physically?",
    answer: "All our vehicles are verified, serviced, and shown with images before booking.",
  },
  {
    question: "I have a Learner's Licence. Will that work?",
    answer: "Sorry, a valid original driver's license for motorcycles/scooters is mandatory.",
  },
  {
    question: "Can I cancel my booking?",
    answer: "Yes, you can cancel your booking anytime. Check our cancellation policy for details.",
  },
  {
    question: "How does Gobikes handle security deposits?",
    answer: "A refundable deposit is collected at booking and refunded after safe return.",
  },
  {
    question: "Will I get a complimentary helmet?",
    answer: "Yes, one helmet is provided. A second one can be added at a nominal cost.",
  },
];

export default function UserDashboard() {
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setDateTime(now.toISOString().slice(0, 16));
  }, []);

  const handleSearch = () => {
    navigate("/home", { state: { city: selectedCity, date: dateTime } });
  };

  return (
    <div
      className="dashboard-page"
      style={{
        backgroundImage: `linear-gradient(rgba(15,15,15,0.7), rgba(15,15,15,0.7)), url(${dash})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <h1 className="dashboard-title">Your Dashboard</h1>
      <div className="dashboard-container">
        
        {/* === LEFT COLUMN === */}
        <div id="booking-widget-sticky" className="dashboard-widget glass-card booking-widget">
          <h2>Book a Ride</h2>
          <div className="search-widget">
            <p className="widget-title">
              Self drive bike rentals in <span>{selectedCity}</span>
            </p>
            <div className="widget-grid">
              <button onClick={() => setIsModalOpen(true)} className="widget-btn">
                <MapPin className="icon" size={20} />
                <div>
                  <span className="label">City</span>
                  <p className="value">{selectedCity}</p>
                </div>
              </button>
              <div className="widget-input">
                <Calendar className="icon" size={20} />
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>
              <button className="search-main-btn gradient-btn" onClick={handleSearch}>
                <Search size={20} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN === */}
        <div className="scrollable-content">
          {/* How to Book */}
          <div className="dashboard-widget glass-card">
            <h2>How to book your ride?</h2>
            <p>Book your dream ride in just four simple steps</p>
            <ul className="steps-list">
              {["Find your Ride", "Book your Ride", "Get Ready to Ride", "End your Ride"].map(
                (title, index) => (
                  <li key={index}>
                    <div className="step-number">{index + 1}</div>
                    <div className="step-content">
                      <h4>{title}</h4>
                      <p>
                        {index === 0
                          ? "Enter city, pick-up, and drop details."
                          : index === 1
                          ? "Select your package and payment method."
                          : index === 2
                          ? "Get ride details by SMS and reach pick-up point."
                          : "Drop the vehicle and receive your deposit refund."}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Why Choose */}
          <div className="dashboard-widget glass-card">
            <h2>Why choose Gobikes?</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <Layers size={30} className="feature-icon" />
                <div><h4>Flexible Packages</h4><p>Daily, weekly, and monthly options.</p></div>
              </div>
              <div className="feature-item">
                <Bike size={30} className="feature-icon" />
                <div><h4>Wide Range</h4><p>Multiple models and locations.</p></div>
              </div>
              <div className="feature-item">
                <Wrench size={30} className="feature-icon" />
                <div><h4>Well Maintained</h4><p>All vehicles serviced regularly.</p></div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="dashboard-widget glass-card">
            <h2>Have Questions? We got you.</h2>
            <div className="faq-container">
              {faqData.map((item, index) => (
                <FAQItem key={index} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CitySelectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectCity={(city) => setSelectedCity(city)}
        />
      )}
    </div>
  );
}
