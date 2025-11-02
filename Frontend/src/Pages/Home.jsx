// src/Pages/Home.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import VehicleCard from "../Components/VehicleCard";
import "../Styles/Home.css";
import dash from "../assets/Projectpic/dash.jpg"; // ✅ background image

// Import images
import bike1 from "../assets/Projectpic/pic1.jpg";
import bike2 from "../assets/Projectpic/pic2.jpg";
import bike3 from "../assets/Projectpic/pic3.jpg";
import bike4 from "../assets/Projectpic/pic4.jpg";
import bike5 from "../assets/Projectpic/pic5.jpg";
import bike6 from "../assets/Projectpic/pic6.jpg";
import bike7 from "../assets/Projectpic/pic7.webp";
import bike8 from "../assets/Projectpic/pic8.webp";
import bike9 from "../assets/Projectpic/pic9.webp";
import bike10 from "../assets/Projectpic/pic10.jpg";
import bike11 from "../assets/Projectpic/pic11.jpg";
import bike12 from "../assets/Projectpic/pic12.webp";

const bikes = [
  { id: 1, name: "Hero Splendor", type: "Commuter", price: 50, location: "Ahmedabad", image: bike1, rating: 4.5, fuelType: "Petrol" },
  { id: 2, name: "Activa 6G", type: "Scooter", price: 60, location: "Agra", image: bike2, rating: 4.3, fuelType: "Petrol" },
  { id: 3, name: "Royal Enfield", type: "Cruiser", price: 120, location: "Ahmedabad", image: bike3, rating: 4.8, fuelType: "Petrol" },
  { id: 4, name: "Honda CB Shine", type: "Commuter", price: 55, location: "Bangalore", image: bike4, rating: 4.2, fuelType: "Petrol" },
  { id: 5, name: "Bajaj Pulsar", type: "Sports", price: 70, location: "Ahmedabad", image: bike5, rating: 4.6, fuelType: "Petrol" },
  { id: 6, name: "Yamaha FZ", type: "Sports", price: 75, location: "Agra", image: bike6, rating: 4.7, fuelType: "Petrol" },
  { id: 7, name: "TVS Apache", type: "Commuter", price: 50, location: "Bangalore", image: bike7, rating: 4.4, fuelType: "Petrol" },
  { id: 8, name: "Suzuki Gixxer", type: "Sports", price: 60, location: "Agra", image: bike8, rating: 4.5, fuelType: "Petrol" },
  { id: 9, name: "KTM Duke", type: "Sports", price: 55, location: "Ahmedabad", image: bike9, rating: 4.9, fuelType: "Petrol" },
  { id: 10, name: "Royal Enfield Classic", type: "Cruiser", price: 65, location: "Bangalore", image: bike10, rating: 4.8, fuelType: "Petrol" },
  { id: 11, name: "Honda Dio", type: "Scooter", price: 70, location: "Ahmedabad", image: bike11, rating: 4.1, fuelType: "Petrol" },
  { id: 12, name: "Bajaj Avenger", type: "Cruiser", price: 75, location: "Agra", image: bike12, rating: 4.7, fuelType: "Petrol" },
];

export default function Home() {
  const location = useLocation();
  const { city, date } = location.state || {};
  const [duration, setDuration] = useState("");
  const [transmission, setTransmission] = useState([]);
  const [brand, setBrand] = useState([]);

  const filteredBikes = bikes.filter((bike) => {
    const matchCity = city ? bike.location.toLowerCase().trim() === city.toLowerCase().trim() : true;
    const matchTransmission = transmission.length > 0 ? transmission.includes(bike.type.toLowerCase()) : true;
    const matchBrand = brand.length > 0 ? brand.includes(bike.name.split(" ")[0]) : true;
    return matchCity && matchTransmission && matchBrand;
  });

  const handleCheckboxChange = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${dash})`,
      }}
    >
      {/* Left Sidebar Filters */}
      <aside className="sidebar glass">
        <h2>FILTERS</h2>

        <div className="filter-section">
          <h3>BOOKING DURATION</h3>
          {[
            "3 Hours Package", "6 Hours Package", "Half Day Package", "Daily Package", "Weekly Package",
            "15 Days Package", "Monthly Package", "3 Months Package", "6 Months Package", "Yearly Package",
          ].map((d) => (
            <label key={d}>
              <input
                type="radio"
                name="duration"
                value={d}
                checked={duration === d}
                onChange={() => setDuration(d)}
              />
              {d}
            </label>
          ))}
        </div>

        <div className="filter-section">
          <h3>TRANSMISSION TYPE</h3>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(setTransmission, "gear")}
              checked={transmission.includes("gear")}
            />
            Gear
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(setTransmission, "gearless")}
              checked={transmission.includes("gearless")}
            />
            Gearless
          </label>
        </div>

        <div className="filter-section">
          <h3>BRANDS</h3>
          {["Honda", "Bajaj", "Hero", "Yamaha", "TVS", "Suzuki"].map((b) => (
            <label key={b}>
              <input
                type="checkbox"
                checked={brand.includes(b)}
                onChange={() => handleCheckboxChange(setBrand, b)}
              />
              {b}
            </label>
          ))}
        </div>
      </aside>

      {/* Right Main Content */}
      <main className="content glass">
        <h1>🏍️ Available Bikes in {city || "All Cities"}</h1>
        {date && <p className="selected-date">Selected Date & Time: {new Date(date).toLocaleString()}</p>}

        <div className="bike-grid">
          {filteredBikes.length > 0 ? (
            filteredBikes.map((bike) => {
              const vehicleData = {
                imageSrc: bike.image,
                name: bike.name,
                trips: Math.round(bike.rating * 5),
                specs: [
                  { icon: "fa-motorcycle", text: bike.type },
                  { icon: "fa-user-group", text: "2 Seater" },
                  { icon: "fa-gas-pump", text: bike.fuelType },
                ],
                location: bike.location,
                pricePerDay: bike.price,
                deposit: bike.price * 20,
                monthlyPrice: bike.price * 25,
              };
              return <VehicleCard key={bike.id} vehicle={vehicleData} />;
            })
          ) : (
            <p className="no-bikes">No bikes found for {city}</p>
          )}
        </div>
      </main>
    </div>
  );
}
