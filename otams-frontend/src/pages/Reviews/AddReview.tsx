import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./reviews.css";

export const AddReview = () => {
  const { packageId } = useParams<{ packageId: string }>();
  const numericPackageId = Number(packageId);
  const { token } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to submit a review.");
      return;
    }

    if (!numericPackageId || numericPackageId <= 0) {
      setMessage("Invalid package ID.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5255/api/Reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          packageId: numericPackageId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message || "Error submitting review.");
      } else {
        setMessage("Review submitted successfully!");
        setComment("");
        setRating(5);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error submitting review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-review-container">
      <h2>Add Review for Package #{numericPackageId}</h2>
      <form onSubmit={handleSubmit} className="add-review-form">
        <label>Rating:</label>
        <input
          type="number"
          min={1}
          max={10}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />

        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review here..."
          required
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {message && (
  <p
    className={`message ${
      message.includes("successfully") ? "success" : "error"
    }`}
  >
    {message}
  </p>
)}

    </div>
  );
};
