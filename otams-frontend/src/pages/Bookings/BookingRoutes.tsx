import { Navigate, Route, Routes } from "react-router-dom";
import { AdminRoute } from "../../components/AdminRoute";
import { AdminBookings } from "./AdminBookings";
import { BookingDetails } from "./BookingDetails";
import { CreateBooking } from "./CreateBooking";
import { EditBooking } from "./EditBooking";
import { MyBookings } from "./MyBookings";

export const BookingRoutes = () => {
  return (
    <Routes>
      <Route path="create" element={<CreateBooking />} />
      <Route path="my" element={<MyBookings />} />
      <Route path="edit/:id" element={<EditBooking />} />
      <Route path="admin/bookings" element={
        <AdminRoute>
          <AdminBookings />
        </AdminRoute>
      } />
      <Route path="admin/bookings/:id" element={
        <AdminRoute>
          <BookingDetails />
        </AdminRoute>
      } />

      <Route index element={<Navigate to="my" />} />
    </Routes>
  );
};
