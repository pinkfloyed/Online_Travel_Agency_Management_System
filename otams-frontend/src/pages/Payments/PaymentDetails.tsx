import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./payments.css";

interface Payment {
  id: number;
  bookingId: number;
  userId: string;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
}

export const PaymentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusColors: Record<string, string> = {
    Pending: "#f0ad4e",
    Paid: "#5cb85c",
    Failed: "#d9534f",
  };

  const fetchPayment = async () => {
    if (!token) return;
    try {
      setLoading(true);
      let url = user?.role === "Admin"
        ? `http://localhost:5255/api/Payments/${id}`
        : `http://localhost:5255/api/Payments/my`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch payment");

      const data = await res.json();

      const paymentData =
        user?.role === "Admin"
          ? data
          : data.find((p: Payment) => p.id === Number(id));

      if (!paymentData) setError("Payment not found or access denied.");
      else setPayment(paymentData);
    } catch (err) {
      console.error(err);
      setError("Error fetching payment details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, [id, token]);

  if (loading) return <p className="loading">Loading payment details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!payment) return null;

  return (
    <div className="payment-details-page">
      <div className="payment-card">
        <h2>Payment Details</h2>

        <div className="payment-row">
          <span className="label">Payment ID:</span>
          <span>{payment.id}</span>
        </div>

        <div className="payment-row">
          <span className="label">Booking ID:</span>
          <span>{payment.bookingId}</span>
        </div>

        <div className="payment-row">
          <span className="label">User ID:</span>
          <span>{payment.userId}</span>
        </div>

        <div className="payment-row">
          <span className="label">Amount:</span>
          <span>${payment.amount.toFixed(2)}</span>
        </div>

        <div className="payment-row">
          <span className="label">Method:</span>
          <span>{payment.method}</span>
        </div>

        <div className="payment-row">
          <span className="label">Status:</span>
          <span
            className="status-badge"
            style={{ backgroundColor: statusColors[payment.status] || "#777" }}
          >
            {payment.status}
          </span>
        </div>

        <div className="payment-row">
          <span className="label">Created At:</span>
          <span>{new Date(payment.createdAt).toLocaleString()}</span>
        </div>

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    </div>
  );
};
