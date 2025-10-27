import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Packages/packages.css";

interface PackageDto {
  id: number;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  images: string[];
  category?: string;
  tags?: string;
  discount?: number;
}

const API_URL = "http://localhost:5255/api/Packages";

export const Packages = () => {
  const [packages, setPackages] = useState<PackageDto[]>([]);
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        alert("Package deleted successfully");
        fetchPackages();
      } else {
        alert("Failed to delete package");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="packages-page">
      <h1 className="page-title">All Packages</h1>
      {user?.role === "Admin" && (
        <button className="create-btn" onClick={() => navigate("/packages/create")}>+ Create New Package</button>
      )}
      <div className="package-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <img
              src={`http://localhost:5255${pkg.images?.[0] || "/default.jpg"}`}
              alt={pkg.title}
              className="package-img"
            />
            <h3>{pkg.title}</h3>
            <p>{pkg.description.slice(0, 80)}...</p>
            <p>
              ${pkg.price} | {pkg.durationDays} days
            </p>
            <button className="view-btn" onClick={() => navigate(`/packages/${pkg.id}`)}>View Details</button>
            {user?.role === "Admin" && (
              <div className="admin-actions">
                <button className="edit-btn" onClick={() => navigate(`/packages/edit/${pkg.id}`)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(pkg.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
