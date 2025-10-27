import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./bookings.css";

const API_URL = "http://localhost:5255/api/Bookings/my";

interface Booking {
  id: number;
  packageName?: string;
  destinationName?: string;
  startDate: string;
  endDate: string;
  status: string;
  totalPrice: number;
  travelers: number;
  discount?: number;
  specialRequests?: string;
}

export const MyBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await fetch(API_URL, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  const cancelBooking = async (id: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await fetch(`http://localhost:5255/api/Bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Booking cancelled");
        fetchBookings();
      } else {
        alert("Failed to cancel booking");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bookings-page">
      <h1>My Bookings</h1>
      <div className="bookings-grid">
        {bookings.map(b => (
          <div key={b.id} className="booking-card">
            <h3>{b.packageName || b.destinationName}</h3>
            <p><strong>Status:</strong> {b.status}</p>
            <p><strong>Start:</strong> {formatDate(b.startDate)}</p>
            <p><strong>End:</strong> {formatDate(b.endDate)}</p>
            <p><strong>Travelers:</strong> {b.travelers}</p>
            <p><strong>Total:</strong> ${b.totalPrice}</p>
            <div className="booking-actions">
              <button onClick={() => navigate(`/bookings/edit/${b.id}`)} className="view-btn">Edit</button>
              <button onClick={() => cancelBooking(b.id)} className="submit-btn">Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


