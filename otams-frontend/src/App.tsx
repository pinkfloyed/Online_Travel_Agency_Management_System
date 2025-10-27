// App.tsx
import { JSX } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import './index.css';
import { About } from "./pages/About/About";
import { AdminUsers } from "./pages/Auth/AdminUsers";
import { Login } from "./pages/Auth/Login";
import { Profile } from "./pages/Auth/Profile";
import { Register } from "./pages/Auth/Register";
import Settings from "./pages/Auth/Settings";
import { BookingRoutes } from "./pages/Bookings/BookingRoutes";
import { DestinationsRoutes } from "./pages/Destinations/DestinationsRoutes";
import { Home } from "./pages/Home/home";
import { PackagesRoutes } from "./pages/Packages/PackagesRoutes";
import { PaymentRoutes } from "./pages/Payments/PaymentRoutes";
import { ReviewsRoutes } from "./pages/Reviews/ReviewsRoutes";
import { Dashboard } from "./pages/Dashboard/Dashboard";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "Admin") return <Navigate to="/" replace />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/destinations/*" element={<DestinationsRoutes />} />
          <Route path="/packages/*" element={<PackagesRoutes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bookings/*" element={<BookingRoutes />} />
          <Route path="/payments/*" element={<PaymentRoutes />} />
          <Route path="/reviews/*" element={<ReviewsRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          } />

        </Routes>
      </>
    </AuthProvider>
  );
}

export default App;
