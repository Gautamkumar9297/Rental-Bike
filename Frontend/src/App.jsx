import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import Offer from './Pages/Offer';  
import ProtectedRoute from './Components/ProtectedRoute';
import './App.css';
import UserDashboard from './Pages/UserDashboard';
import MultiStepForm from './Components/MultiStepForm';
import BikeBookingForm from './Pages/BikeBookingForm';
import Footer from './Components/Footer';

// ✅ Hook must be used inside a component
function AppContent() {
  const location = useLocation();

  // ✅ Footer only on dashboard ("/") and offer ("/offer")
  const showFooter = location.pathname === "/" || location.pathname === "/offer";

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/bike-booking" element={<ProtectedRoute><BikeBookingForm /></ProtectedRoute>} />
          <Route path="/list-bike" element={<ProtectedRoute><MultiStepForm /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/nav" element={<Footer />} />
        </Routes>
      </div>

      {/* ✅ Conditional Footer */}
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
