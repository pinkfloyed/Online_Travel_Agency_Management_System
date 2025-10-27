import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">
      <div className="logo">
        <Link to="/">
          <img src="/images/travellogo.png" alt="TravelTales" style={{ height: "20px" }} />TravelTales
        </Link>
      </div>


      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/destinations">Destinations</Link></li>
        <li><Link to="/packages">Packages</Link></li>

        {/* Bookings Dropdown */}
        {user && (
          <li className="dropdown">
            <span className="dropbtn">Bookings ▾</span>
            <div className="dropdown-content">
              {user.role === "Admin" ? (
                <Link to="/bookings/admin/bookings">Manage Bookings</Link>
              ) : (
                <>
                  <Link to="/bookings/my">My Bookings</Link>
                  <Link to="/bookings/create">Create Booking</Link>
                </>
              )}
            </div>
          </li>
        )}

        {/* Payments Dropdown */}
        {user && (
          <li className="dropdown">
            <span className="dropbtn">Payments ▾</span>
            <div className="dropdown-content">
              {user.role === "Admin" ? (
                <Link to="/payments/admin/payments">Manage Payments</Link>
              ) : (
                <>
                  <Link to="/payments/my-payments">My Payments</Link>
                  <Link to="/payments/create">Create Payment</Link>
                </>
              )}
            </div>
          </li>
        )}

        {/* Reviews Dropdown */}
        {user && (
          <li className="dropdown">
            <span className="dropbtn">Reviews ▾</span>
            <div className="dropdown-content">
              {user.role === "Admin" ? (
                <Link to="/reviews/admin">Manage Reviews</Link>
              ) : (
                <>
                  <Link to="/reviews/my">My Reviews</Link>
                </>
              )}
            </div>
          </li>
        )}

        {user && user.role === "Admin" && (
          <li><Link to="/dashboard">Dashboard</Link></li>
        )}

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}

        {/* Profile Dropdown */}
        {user && (
          <li className="dropdown">
            <button>{user.userName} ({user.role}) ▾</button>
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={() => navigate("/profile")}>View Profile</li>
              <li className="dropdown-item" onClick={() => navigate("/settings")}>Settings</li>
              {user.role === "Admin" && (
                <li className="dropdown-item" onClick={() => navigate("/admin/users")}>Manage Users</li>
              )}
              <li className="dropdown-item" onClick={handleLogout}>Logout</li>
            </ul>
          </li>
        )}
      </ul>
    </nav>
  );
};
