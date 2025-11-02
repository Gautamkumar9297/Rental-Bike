import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import {
  FaBars,
  FaUsers,
  FaBiking,
  FaCommentDots,
  FaMoneyBillWave,
  FaSignOutAlt,
} from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/AdminDashboard.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalPayments: 0,
    totalFeedbacks: 0,
  });
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchDashboard();
    fetchBookings();
    fetchUsers();
    fetchFeedbacks();
    fetchTransactions();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching dashboard:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/admin/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get("/admin/feedbacks");
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/admin/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`/admin/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Chart Data
  const chartData = {
    labels: ["Users", "Bookings", "Payments", "Feedbacks"],
    datasets: [
      {
        label: "Overview",
        data: [
          stats.totalUsers,
          stats.totalBookings,
          stats.totalPayments,
          stats.totalFeedbacks,
        ],
        backgroundColor: ["#38bdf8", "#34d399", "#fbbf24", "#f87171"],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="admin-dashboard">
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2 className="logo">Admin Panel</h2>
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""}>
            <a onClick={() => setActiveTab("dashboard")}>
              <FaBars /> Dashboard
            </a>
          </li>
          <li className={activeTab === "bookings" ? "active" : ""}>
            <a onClick={() => setActiveTab("bookings")}>
              <FaBiking /> Bookings
            </a>
          </li>
          <li className={activeTab === "users" ? "active" : ""}>
            <a onClick={() => setActiveTab("users")}>
              <FaUsers /> Users
            </a>
          </li>
          <li className={activeTab === "feedbacks" ? "active" : ""}>
            <a onClick={() => setActiveTab("feedbacks")}>
              <FaCommentDots /> Feedbacks
            </a>
          </li>
          <li className={activeTab === "transactions" ? "active" : ""}>
            <a onClick={() => setActiveTab("transactions")}>
              <FaMoneyBillWave /> Transactions
            </a>
          </li>
        </ul>

        {/* Logout button at bottom */}
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <h1>Admin Dashboard</h1>
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="cards">
              <div className="card">
                <FaUsers className="card-icon" />
                <div className="card-content">
                  <h3>Total Users</h3>
                  <p>{stats.totalUsers}</p>
                </div>
              </div>
              <div className="card">
                <FaBiking className="card-icon" />
                <div className="card-content">
                  <h3>Total Bookings</h3>
                  <p>{stats.totalBookings}</p>
                </div>
              </div>
              <div className="card">
                <FaMoneyBillWave className="card-icon" />
                <div className="card-content">
                  <h3>Total Payments</h3>
                  <p>{stats.totalPayments}</p>
                </div>
              </div>
              <div className="card">
                <FaCommentDots className="card-icon" />
                <div className="card-content">
                  <h3>Total Feedbacks</h3>
                  <p>{stats.totalFeedbacks}</p>
                </div>
              </div>
            </div>

            {/* Graph Section */}
            <div className="chart-section">
              <h2 className="chart-title">Performance Overview</h2>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </>
        )}

        {activeTab === "bookings" && (
          <div className="table-section">
            <h2>All Bookings</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Purpose</th>
                    <th>Destination</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((b) => (
                      <tr key={b._id}>
                        <td>{b.name || "N/A"}</td>
                        <td>{b.email || "N/A"}</td>
                        <td>{b.purpose || "N/A"}</td>
                        <td>{b.destination || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center", color: "#94a3b8" }}>
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="table-section">
            <h2>All Users</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.role || "User"}</td>
                      <td>
                        <button className="delete-btn" onClick={() => deleteUser(u._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "feedbacks" && (
          <div className="table-section">
            <h2>All Feedbacks</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((f) => (
                    <tr key={f._id}>
                      <td>{f.user?.name || "Anonymous"}</td>
                      <td>{f.message}</td>
                      <td>{new Date(f.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="table-section">
            <h2>All Transactions</h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t._id}>
                      <td>{t.user?.name}</td>
                      <td>₹{t.amount}</td>
                      <td>
                        <span className={`status status-${t.status}`}>{t.status}</span>
                      </td>
                      <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
