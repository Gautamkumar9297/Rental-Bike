// src/Components/VehicleCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // ✅ Import this
import "../Styles/VehicleCard.css";

function VehicleCard({ vehicle }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleFlipToBack = () => setIsFlipped(true);
  const handleFlipToFront = () => setIsFlipped(false);

  const handleBookNow = () => {
    // ✅ Redirect to booking form page
    navigate("/bike-booking", { state: { vehicle } });
  };

  if (!vehicle) return null;

  return (
    <div className="card">
      <div className="card-top">
        <img src={vehicle.imageSrc} alt={vehicle.name} className="scooter-img" />
        <h3>{vehicle.name}</h3>
        <span className="trips-badge">{vehicle.trips} Trips</span>
      </div>

      <div className={`card-bottom-wrapper ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card-flipper">
          {/* FRONT SIDE */}
          <div className="flip-face flip-front">
            <div className="info-row">
              {vehicle.specs.map((spec, index) => (
                <span key={index}>
                  <i className={`fa-solid ${spec.icon}`}></i> {spec.text}
                </span>
              ))}
            </div>
            <div className="location-row">
              <p>Available at</p>
              <strong>{vehicle.location}</strong>
            </div>
            <div className="book-now-bar">
              <div className="price">
                <strong>₹ {vehicle.pricePerDay}</strong> (incl. Tax)
                <small>Deposit: ₹ {vehicle.deposit}</small>
              </div>

              <div className="button-group">
                {/* ✅ Changed this button to redirect */}
                <button className="book-btn" onClick={handleBookNow}>
                  Book Now
                </button>

                <button className="flip-btn" onClick={handleFlipToBack}>
                  View Packages
                </button>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="flip-face flip-back">
            <div className="packages-content">
              <p className="packages-title">View All Packages</p>
              <div className="packages-grid">
                <div className="package-option">
                  <span className="duration">Daily</span>
                  <strong>₹ {vehicle.pricePerDay}</strong>
                  <small>Per Day</small>
                </div>
                <div className="package-option">
                  <span className="duration">Monthly</span>
                  <strong>₹ {vehicle.monthlyPrice}</strong>
                  <small>Per Month</small>
                </div>
              </div>
              <small className="limit-info">(No distance limit)</small>
            </div>
            <button className="back-btn" onClick={handleFlipToFront}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleCard;
