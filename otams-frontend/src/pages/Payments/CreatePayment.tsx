import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./payments.css";

const API_URL = "http://localhost:5255/api/Payments";

export const CreatePayment = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<string>("card");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId, amount, method }),
      });
      if (!res.ok) throw new Error("Payment creation failed");
      alert("Payment created successfully!");
      navigate("/payments/my-payments");
    } catch (err) {
      console.error(err);
      alert("Error creating payment");
    }
  };

  return (
    <div className="payments-page">
      <h1>Create Payment</h1>
      <form className="payment-form" onSubmit={handleSubmit}>
        <label>Booking ID</label>
        <input type="number" value={bookingId} onChange={e => setBookingId(Number(e.target.value))} required />

        <label>Amount</label>
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} required />

        <label>Method</label>
        <select value={method} onChange={e => setMethod(e.target.value)}>
          <option value="card">Card</option>
          <option value="cash">Bkash</option>
          <option value="cash">Nagad</option>
          <option value="paypal">PayPal</option>
          <option value="cash">Cash</option>
        </select>

        <button type="submit">Create Payment</button>
      </form>
    </div>
  );
};
