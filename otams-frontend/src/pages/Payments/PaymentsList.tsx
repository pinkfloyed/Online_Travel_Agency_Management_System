import { useEffect, useState } from "react";
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

const API_URL = "http://localhost:5255/api/Payments";

export const PaymentsList = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (id: number) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/confirm/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("Payment confirmed!");
        fetchPayments();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPayments(); }, []);

  if (loading) return <p>Loading payments...</p>;
  if (!payments.length) return <p>No payments found.</p>;

  return (
    <div className="payments-page">
      <h1>All Payments (Admin)</h1>
      <div className="payments-grid">
        {payments.map(p => (
          <div key={p.id} className="payment-card">
            <h3>Booking ID: {p.bookingId}</h3>
            <p><strong>User:</strong> {p.userId}</p>
            <p><strong>Amount:</strong> ${p.amount}</p>
            <p>
              <strong>Status:</strong> 
              <span className={`payment-status status-${p.status}`}> {p.status}</span>
            </p>
            <p><strong>Method:</strong> {p.method}</p>
            <p><strong>Created At:</strong> {new Date(p.createdAt).toLocaleString()}</p>
            {p.status === "Unpaid" && (
              <div className="card-buttons">
                <button className="confirm-btn" onClick={() => confirmPayment(p.id)}>Confirm Payment</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
