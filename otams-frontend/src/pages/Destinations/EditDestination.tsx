import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../Destinations/destinations.css";

const API_URL = "http://localhost:5255/api/destinations";

export const EditDestination = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    name: "",
    country: "",
    city: "",
    description: "",
    priceFrom: 0,
    category: "",
    tags: "",
    newImages: [] as File[],
    existingImages: [] as string[],
    isActive: true,
  });

  useEffect(() => {
    const fetchDestination = async () => {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setFormData({
        ...data,
        newImages: [],
        existingImages: data.images,
      });
    };
    fetchDestination();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormData((prev: any) => ({ ...prev, newImages: Array.from(e.target.files!) }));
  };

  const handleExistingImageToggle = (img: string) => {
    setFormData((prev: any) => ({
      ...prev,
      existingImages: prev.existingImages.includes(img)
        ? prev.existingImages.filter((i: string) => i !== img)
        : [...prev.existingImages, img],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
  if (key === "images" && Array.isArray(value)) {
    value.forEach((file) => data.append("Images", file));
  } else {
    data.append(key, value as any); // cast to any
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
        alert("Destination updated successfully");
        navigate("/destinations");
      } else {
        alert("Failed to update destination");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="destination-form">
      <h1>Edit Destination</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        <input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
        <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
        <input
          type="number"
          name="priceFrom"
          placeholder="Price From"
          value={formData.priceFrom}
          onChange={handleChange}
        />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input name="tags" placeholder="Tags" value={formData.tags} onChange={handleChange} />
        
        <div>
          <label>Existing Images:</label>
          <div className="images-row">
            {formData.existingImages?.map((img: string) => (
              <img
                key={img}
                src={`http://localhost:5255${img}`}
                alt={img}
                style={{ width: 100, margin: 5, cursor: "pointer", border: formData.existingImages.includes(img) ? "3px solid #004aad" : "1px solid #ccc" }}
                onClick={() => handleExistingImageToggle(img)}
              />
            ))}
          </div>
        </div>

        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit" className="submit-btn">Update</button>
      </form>
    </div>
  );
};
