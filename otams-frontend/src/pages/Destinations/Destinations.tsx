import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Destinations/destinations.css";

interface Destination {
  id: number;
  name: string;
  country: string;
  city: string;
  description: string;
  priceFrom: number;
  images: string[];
  category?: string;
  tags?: string;
  isActive: boolean;
}

const API_URL = "http://localhost:5255/api/destinations";

export const Destinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const fetchDestinations = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setDestinations(data);
    } catch (err) {
      console.error("Error fetching destinations:", err);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="destinations-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Popular Destinations</h1>
        <p>Discover amazing places around the world with our best packages</p>
      </div>

      {user?.role === "Admin" && (
        <button className="create-btn" onClick={() => navigate("/destinations/create")}>
          + Create New Destination
        </button>
      )}

      <div className="destination-grid">
        {destinations.map((dest) => (
          <div className="destination-card" key={dest.id}>
            <img
              src={`http://localhost:5255${dest.images?.[0] || "/default.jpg"}`}
              alt={dest.name}
              className="destination-img"
            />
            <h3>{dest.name}</h3>
            <p>{dest.description.slice(0, 80)}...</p>
            <p>
              <strong>Country:</strong> {dest.country} | <strong>City:</strong> {dest.city}
            </p>

            <div className="admin-actions">
              <button className="view-btn" onClick={() => navigate(`/destinations/${dest.id}`)}>
                View Details
              </button>
              {user?.role === "Admin" && (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/destinations/edit/${dest.id}`)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => {
                    if(window.confirm("Are you sure?")) {
                      fetch(`${API_URL}/${dest.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` }})
                        .then(() => fetchDestinations())
                        .catch(console.error)
                    }
                  }}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
