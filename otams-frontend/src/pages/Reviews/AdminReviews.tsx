import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./reviews.css";

interface Review {
  id: number;
  packageId: number;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export const AdminReviews = () => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAllReviews = async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5255/api/Reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch all reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching admin reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, [token]);

  if (loading) return <p>Loading all reviews...</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div className="reviews-grid">
      {reviews.map((r) => (
        <div key={r.id} className="review-card">
          <h4>Package ID: {r.packageId}</h4>
          <p><strong>User ID:</strong> {r.userId}</p>
          <p><strong>Rating:</strong> {r.rating} ⭐</p>
          <p><strong>Comment:</strong> {r.comment}</p>
          <p><small>Created At: {new Date(r.createdAt).toLocaleString()}</small></p>
        </div>
      ))}
    </div>
  );
};
