import React from 'react';
import '../Styles/AdminDashboard.css';

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-section">
        <button>Add New Bike</button>
        <button>View Rentals</button>
        <button>Manage Users</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
