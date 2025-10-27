import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./bookings.css";

const API_URL = "http://localhost:5255/api/bookings";

export const EditBooking = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    travelers: 1,
    totalPrice: 0,
    discount: 0,
    specialRequests: "",
  });

  const fetchBooking = async () => {
    try {
      // fetch only current user's bookings
      const res = await fetch(`${API_URL}/my`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const booking = data.find((b: any) => b.id === Number(id));
      if (booking) {
        setFormData({
          startDate: booking.startDate.split("T")[0],
          endDate: booking.endDate.split("T")[0],
          travelers: booking.travelers,
          totalPrice: booking.totalPrice,
          discount: booking.discount,
          specialRequests: booking.specialRequests || "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          startDate: formData.startDate,
          endDate: formData.endDate,
          travelers: Number(formData.travelers),
          totalPrice: Number(formData.totalPrice),
          discount: Number(formData.discount),
          specialRequests: formData.specialRequests,
        }),
      });
      if (res.ok) {
        alert("Booking updated successfully");
        navigate("/bookings/my");
      } else {
        const data = await res.json();
        alert("Failed to update booking: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="booking-form-page">
      <h1>Edit Booking</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
  <label>Start Date</label>
  <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

  <label>End Date</label>
  <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

  <label>Travelers</label>
  <input type="number" name="travelers" value={formData.travelers} onChange={handleChange} min={1} />

  <label>Total Price ($)</label>
  <input type="number" name="totalPrice" value={formData.totalPrice} onChange={handleChange} min={0} />

  <label>Discount ($)</label>
  <input type="number" name="discount" value={formData.discount} onChange={handleChange} min={0} />

  <label>Special Requests</label>
  <textarea name="specialRequests" placeholder="Any special requests?" value={formData.specialRequests} onChange={handleChange} />

  <button type="submit" className="submit-btn">Update Booking</button>
</form>

    </div>
  );
};
