import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./bookings.css";

const API_URL = "http://localhost:5255/api/Bookings";

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

export const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch booking");
        const data = await res.json();
        setBooking(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (id) fetchBooking();
  }, [id, token]);

  if (!booking) return <p>Loading booking details...</p>;

  return (
    <div className="booking-details">
      <h1>Booking Details</h1>
      <h2>{booking.packageName || booking.destinationName}</h2>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Start:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
      <p><strong>End:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
      <p><strong>Travelers:</strong> {booking.travelers}</p>
      <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
      {booking.discount !== undefined && <p><strong>Discount:</strong> ${booking.discount}</p>}
      <p><strong>Special Requests:</strong> {booking.specialRequests || "-"}</p>
    </div>
  );
};
