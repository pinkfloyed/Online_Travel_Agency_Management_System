import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Packages/packages.css";


const API_URL = "http://localhost:5255/api/Packages";

export const CreatePackage = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    durationDays: 1,
    destinationId: 0,
    images: [] as File[],
    category: "",
    tags: "",
    discount: 0,
  });

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
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      if (res.ok) {
        alert("Package created successfully");
        navigate("/packages");
      } else {
        alert("Failed to create package");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="package-form">
      <h1>Create Package</h1>
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
            <label>Upload Images</label>
            <input type="file" name="images" multiple onChange={handleFileChange} />
          </div>

          <div className="form-group full center">
            <button type="submit" className="submit-btn">Create</button>
          </div>
        </div>
      </form>
    </div>

  );

};
