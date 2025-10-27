import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./payments.css";

interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  method: string;
  status: string;
  createdAt: string;
}

const API_URL = "http://localhost:5255/api/Payments/my";

export const MyPayments = () => {
  const { token } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPayments = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching payments");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchPayments(); }, []);

  if (loading) return <p>Loading...</p>;
  if (!payments.length) return <p>No payments found.</p>;

  return (
    <div className="payments-page">
      <h1>My Payments</h1>
      <div className="payments-grid">
        {payments.map(p => (
          <div key={p.id} className="payment-card">
            <h3>Booking ID: {p.bookingId}</h3>
            <p><strong>Amount:</strong> ${p.amount}</p>
            <p><strong>Status:</strong> 
              <span className={`payment-status status-${p.status}`}>{p.status}</span>
            </p>
            <p><strong>Method:</strong> {p.method}</p>
            <p><strong>Created At:</strong> {new Date(p.createdAt).toLocaleString()}</p>
            <div className="card-buttons">
              <button className="view-btn" onClick={() => navigate(`/payments/${p.id}`)}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
