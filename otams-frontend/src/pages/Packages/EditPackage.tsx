import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Packages/packages.css";

const API_URL = "http://localhost:5255/api/Packages";

export const EditPackage = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    durationDays: 0,
    destinationId: 0,
    category: "",
    tags: "",
    discount: 0,
    images: [] as File[],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch package");
        const data = await res.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price || 0,
          durationDays: data.durationDays || 0,
          destinationId: data.destinationId || 0,
          category: data.category || "",
          tags: data.tags || "",
          discount: data.discount || 0,
          images: [],
        });
      } catch (err) {
        console.error(err);
        alert("Error loading package");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return; // check for null
  setFormData((prev) => ({ ...prev, images: Array.from(files) }));
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => data.append("Images", file));
      } else {
        data.append(key, value as any);
      }
    });

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (res.ok) {
        alert("Package updated successfully");
        navigate("/packages");
      } else {
        alert("Failed to update package");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "30px" }}>Loading...</p>;

  return (
    <div className="package-form">
      <h1>Update Package</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group full">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter package description..."
            ></textarea>
          </div>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Package title"
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>

          <div className="form-group">
            <label>Duration (days)</label>
            <input
              type="number"
              name="durationDays"
              value={formData.durationDays}
              onChange={handleChange}
              placeholder="Duration in days"
            />
          </div>

          <div className="form-group">
            <label>Destination ID</label>
            <input
              type="number"
              name="destinationId"
              value={formData.destinationId}
              onChange={handleChange}
              placeholder="Destination ID"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category name"
            />
          </div>

          <div className="form-group">
            <label>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Comma-separated tags"
            />
          </div>

          <div className="form-group">
            <label>Discount</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Discount %"
            />
          </div>

          <div className="form-group full">
            <label>Upload New Images (optional)</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          <div className="form-group full center">
            <button type="submit" className="submit-btn">Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};
