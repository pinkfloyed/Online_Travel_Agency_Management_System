import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5255/api/destinations";

export const CreateDestination = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    description: "",
    priceFrom: 0,
    category: "",
    tags: "",
    images: [] as File[],
    isActive: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files!) }));
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      if (res.ok) {
        alert("Destination created successfully");
        navigate("/destinations");
      } else {
        alert("Failed to create destination");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="destination-form">
      <h1>Create Destination</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="country" placeholder="Country" onChange={handleChange} required />
        <input name="city" placeholder="City" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <input
          type="number"
          name="priceFrom"
          placeholder="Price From"
          onChange={handleChange}
          required
        />
        <input name="category" placeholder="Category" onChange={handleChange} />
        <input name="tags" placeholder="Tags" onChange={handleChange} />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit" className="submit-btn">
          Create
        </button>
      </form>
    </div>
  );
};
