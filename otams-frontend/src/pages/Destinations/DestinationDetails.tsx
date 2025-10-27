import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

export const DestinationDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        setDestination(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDestination();
  }, [id]);

  if (!destination) return <p>Loading...</p>;

  return (
    <div className="destination-details">
      <h1>{destination.name}</h1>
      <p>
        <strong>Country:</strong> {destination.country} | <strong>City:</strong> {destination.city}
      </p>
      <p>{destination.description}</p>
      <p>
        <strong>Price From:</strong> ${destination.priceFrom} <br />
        <strong>Category:</strong> {destination.category} <br />
        <strong>Tags:</strong> {destination.tags}
      </p>

      <div className="images-row">
        {destination.images?.map((img, idx) => (
          <img
            key={idx}
            src={`http://localhost:5255${img}`}
            alt={`${destination.name} image ${idx + 1}`}
          />
        ))}

      </div>
      <div className="button-row">
          <button className="back-btn" onClick={() => navigate("/destinations")}>
            ← Back to List
          </button>
          <button className="edit-btn" onClick={() => navigate(`/destinations/edit/${destination.id}`)}>
            ✏️ Edit Destinations
          </button>
        </div>
    </div>
  );
};
