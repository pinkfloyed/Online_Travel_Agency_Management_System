import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./reviews.css";

interface Review {
  id: number;
  packageId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export const MyReviews = () => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5255/api/Reviews/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [token]);

  if (loading) return <p>Loading your reviews...</p>;
  if (reviews.length === 0) return <p>No reviews found.</p>;

  return (
    <div className="reviews-grid">
      {reviews.map((r) => (
        <div key={r.id} className="review-card">
          <h4>Package ID: {r.packageId}</h4>
          <p><strong>Rating:</strong> {r.rating} ⭐</p>
          <p><strong>Comment:</strong> {r.comment}</p>
          <p><small>Created At: {new Date(r.createdAt).toLocaleString()}</small></p>
        </div>
      ))}
    </div>
  );
};
