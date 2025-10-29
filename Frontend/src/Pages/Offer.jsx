// src/pages/Offer.jsx
import React, { useState } from "react";
import { Bike, Sparkles, Clipboard, Check } from "lucide-react";
import "../Styles/Offer.css";
import dash from "../assets/projectpic/dash.jpg"; // ✅ Background image

const offersData = [
  {
    title: "Get upto Rs. 100 on payments via Mobikwik",
    description:
      "Get upto Rs. 100 cashback for your payments via Mobikwik. Offer is valid for all users on a minimum transaction value on Mobikwik platform of Rs.999/-",
    code: "MBK100",
    image: "https://placehold.co/200x150/00AFFF/FFFFFF?text=Mobikwik",
  },
  {
    title: "Get Flat Rs. 100 OFF",
    description: "Get Flat Rs. 100 off on orders above Rs. 2,000",
    code: "GOBIKES100",
    image: "https://placehold.co/200x150/EEEEEE/333333?text=Bike",
  },
  {
    title: "Get Flat Rs. 50 OFF",
    description: "Get Flat Rs. 50 off on orders above Rs. 1,000",
    code: "GOBIKES50",
    image: "https://placehold.co/200x150/FF6347/FFFFFF?text=Scooter",
  },
  {
    title: "Get Flat Rs. 200 OFF",
    description: "Get Flat Rs. 200 off on orders above Rs. 5,000",
    code: "GOBIKES200",
    image: null,
  },
  {
    title: "Get Flat Rs. 500 OFF",
    description: "Get Flat Rs. 500 off on orders above Rs. 10,000",
    code: "GOBIKES500",
    image: null,
  },
];

function OfferCard({ offer }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="offer-card">
      <div className="bike-icon">
        <Bike size={20} />
      </div>

      <div className="offer-content">
        <h3>{offer.title}</h3>
        <p>{offer.description}</p>
        {offer.image && (
          <img
            src={offer.image}
            alt={offer.title}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/200x150/CCCCCC/FFFFFF?text=Image+Not+Found";
            }}
          />
        )}
      </div>

      {offer.code && (
        <div className="offer-code" onClick={() => handleCopy(offer.code)}>
          {offer.code}
          <span className="copy-icon">
            {copied ? <Check size={16} /> : <Clipboard size={16} />}
          </span>
          {copied && <span className="copied-text">Copied!</span>}
        </div>
      )}
    </div>
  );
}

export default function Offer() {
  return (
    <div
      className="offer-page"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)
        ), url(${dash})`,
      }}
    >
      <div className="offer-header">
        <Sparkles className="sparkle-icon" />
        <h1>Offers for You</h1>
      </div>

      <div className="offer-grid">
        {offersData.map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>
    </div>
  );
}
