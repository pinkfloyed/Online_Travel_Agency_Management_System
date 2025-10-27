import { Route, Routes } from "react-router-dom";
import { AddReview } from "./AddReview";
import { AdminReviews } from "./AdminReviews";
import { MyReviews } from "./MyReviews";
import { ReviewDetails } from "./ReviewDetails";
import { ReviewsList } from "./ReviewsList";

export const ReviewsRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ReviewsList />} />
      <Route path="/my" element={<MyReviews />} />
      <Route path="/create/:packageId" element={<AddReview />} />
      <Route path="/:id" element={<ReviewDetails />} />
      <Route path="/admin" element={<AdminReviews />} />

    </Routes>
  );
};
