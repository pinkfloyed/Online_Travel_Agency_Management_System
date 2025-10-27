import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Packages/packages.css";

const API_URL = "http://localhost:5255/api/Packages";

interface PackageData {
  id: number;
  title: string;
  description: string;
  price: number;
  durationDays: number;
  destinationId: number;
  category: string;
  tags: string;
  discount: number;
  images: string[];
}

export const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<PackageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch package");
        const data = await res.json();
        setPkg(data);
      } catch (err) {
        console.error(err);
        alert("Error loading package details");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "30px" }}>Loading...</p>;
  if (!pkg) return <p style={{ textAlign: "center", marginTop: "30px" }}>Package not found</p>;

  return (
    <div className="package-details">
      <div className="details-card">
        <h1>{pkg.title}</h1>
        <p className="description">{pkg.description}</p>

        <div className="details-grid">
          <div className="detail-item"><strong>Price:</strong> ${pkg.price}</div>
          <div className="detail-item"><strong>Duration:</strong> {pkg.durationDays} days</div>
          <div className="detail-item"><strong>Destination ID:</strong> {pkg.destinationId}</div>
          <div className="detail-item"><strong>Category:</strong> {pkg.category}</div>
          <div className="detail-item"><strong>Tags:</strong> {pkg.tags}</div>
          <div className="detail-item"><strong>Discount:</strong> {pkg.discount}%</div>
        </div>

        {pkg.images && pkg.images.length > 0 && (
          <div className="image-gallery">
            {pkg.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5255/${img}`}
                alt={`Package image ${index + 1}`}
                className="package-image"
              />
            ))}
          </div>
        )}

        <div className="button-row">
          <button className="back-btn" onClick={() => navigate("/packages")}>
            ← Back to List
          </button>
          <button className="edit-btn" onClick={() => navigate(`/packages/edit/${pkg.id}`)}>
            ✏️ Edit Package
          </button>

          {/* Add Review button */}
  <Link to={`/reviews/create/${pkg.id}`} className="add-review-btn">
    📝 Add Review
  </Link>

        </div>
      </div>
    </div>
  );
};
