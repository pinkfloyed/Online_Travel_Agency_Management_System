import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./bookings.css";

const API_URL = "http://localhost:5255/api/Bookings";

interface Booking {
  id: number;
  packageName?: string;
  destinationName?: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: number | string;
  totalPrice: number;
  travelers: number;
}

export const AdminBookings = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const statusMap: Record<string, string> = {
    "0": "Pending",
    "1": "Confirmed",
    "2": "Cancelled",
    "Pending": "Pending",
    "Confirmed": "Confirmed",
    "Cancelled": "Cancelled",
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id: number, newStatus: number) => {
    try {
      const statusString =
        newStatus === 0 ? "Pending" : newStatus === 1 ? "Confirmed" : "Cancelled";

      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: statusString }),
      });

      if (res.ok) {
        alert("✅ Status updated successfully");
        setTimeout(fetchBookings, 300);
      } else {
        const data = await res.json();
        alert("❌ Failed: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  };

  const deleteBooking = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}/admin`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("🗑️ Booking deleted successfully");
        fetchBookings();
      } else {
        const data = await res.json();
        alert("❌ Failed: " + (data.message || JSON.stringify(data)));
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting booking");
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  if (loading) return <p className="loading-text">Loading bookings...</p>;
  if (bookings.length === 0) return <p className="empty-text">No bookings found.</p>;

  return (
    <div className="admin-bookings-page">
      <h1 className="page-title">Manage Bookings</h1>
      <div className="bookings-grid">
        {bookings.map((b) => {
          const status = statusMap[b.status.toString()] || "Unknown";
          return (
            <div key={b.id} className={`booking-card ${status.toLowerCase()}`}>
              <div className="booking-header">
                <h3>{b.packageName || b.destinationName || "Untitled Trip"}</h3>
                <span className={`status-badge ${status.toLowerCase()}`}>{status}</span>
              </div>

              <div className="booking-info">
                <p><strong>User ID:</strong> {b.userId}</p>
                <p><strong>Start:</strong> {formatDate(b.startDate)}</p>
                <p><strong>End:</strong> {formatDate(b.endDate)}</p>
                <p><strong>Travelers:</strong> {b.travelers}</p>
                <p><strong>Total:</strong> ${b.totalPrice}</p>
              </div>

              <div className="booking-actions">
                <select
                  className="status-select"
                  value={
                    typeof b.status === "string"
                      ? ["Pending", "Confirmed", "Cancelled"].indexOf(b.status)
                      : b.status
                  }
                  onChange={(e) => updateStatus(b.id, Number(e.target.value))}
                >
                  <option value={0}>Pending</option>
                  <option value={1}>Confirmed</option>
                  <option value={2}>Cancelled</option>
                </select>

                <button
                  className="view-btn"
                  onClick={() => navigate(`/bookings/admin/bookings/${b.id}`)}
                >
                  View Details
                </button>
                <button className="delete-btn" onClick={() => deleteBooking(b.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
