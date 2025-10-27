import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./bookings.css";

const API_URL = "http://localhost:5255/api/Bookings";

export const CreateBooking = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    packageId: "",
    destinationId: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    totalPrice: 0,
    discount: 0,
    specialRequests: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Booking created successfully");
        navigate("/bookings/my");
      } else alert("Failed to create booking");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="booking-form-page">
      <h1>Create Booking</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <input name="packageId" placeholder="Package ID" value={formData.packageId} onChange={handleChange} />
        <input name="destinationId" placeholder="Destination ID" value={formData.destinationId} onChange={handleChange} />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
        <input type="number" name="travelers" placeholder="Travelers" value={formData.travelers} onChange={handleChange} min={1} />
        <input type="number" name="totalPrice" placeholder="Total Price" value={formData.totalPrice} onChange={handleChange} min={0} />
        <input type="number" name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} min={0} />
        <textarea name="specialRequests" placeholder="Special Requests" value={formData.specialRequests} onChange={handleChange} />
        <button type="submit" className="submit-btn">Create Booking</button>
      </form>
    </div>
  );
};
