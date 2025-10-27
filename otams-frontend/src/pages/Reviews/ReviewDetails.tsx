import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export const ReviewDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);

  const fetchReview = async () => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:5255/api/Reviews/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch review");
      const data = await res.json();
      const r = data.find((rev: Review) => rev.id === Number(id));
      if (r) setReview(r);
    } catch (err) {
      console.error(err);
      alert("Error fetching review");
    }
  };

  useEffect(() => {
    fetchReview();
  }, [id, token]);

  if (!review) return <p>Loading review...</p>;

  return (
    <div className="review-details-page">
      <div className="review-card">
        <h2>Review Details</h2>
        <p><strong>Package ID:</strong> {review.packageId}</p>
        <p><strong>User ID:</strong> {review.userId}</p>
        <p><strong>Rating:</strong> {review.rating} ⭐</p>
        <p><strong>Comment:</strong> {review.comment}</p>
        <p><small>Created At: {new Date(review.createdAt).toLocaleString()}</small></p>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      </div>
    </div>
  );
};
