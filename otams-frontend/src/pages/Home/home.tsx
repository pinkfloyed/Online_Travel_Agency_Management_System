import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";
import "./home.css";

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  images: string[];
}

interface Package {
  id: number;
  title: string;
  price: number;
  durationDays: number;
  images: string[];
}

const API_URL_DESTINATIONS = "http://localhost:5255/api/Destinations";
const API_URL_PACKAGES = "http://localhost:5255/api/Packages";

export const Home = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(API_URL_DESTINATIONS);
        const data = await res.json();
        setDestinations(data.slice(0, 6)); // top 6 destinations
      } catch (err) {
        console.error(err);
      }
    };

    const fetchPackages = async () => {
      try {
        const res = await fetch(API_URL_PACKAGES);
        const data = await res.json();
        setPackages(data.slice(0, 6)); 
      } catch (err) {
        console.error(err);
      }
    };

    fetchDestinations();
    fetchPackages();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Explore the World with TravelTales</h1>
          <p>Discover amazing destinations and exclusive packages just for you.</p>
          <Link to="/destinations" className="hero-btn">Explore Now</Link>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="section">
        <h2>Popular Destinations</h2>
        <div className="card-grid">
          {destinations.map(dest => (
            <div key={dest.id} className="card">
              <img src={dest.images[0]?`http://localhost:5255/${dest.images[0]}`:""} alt={dest.name} />
              <div className="card-info">
                <h3>{dest.name}</h3>
                <p>{dest.country}</p>
                <Link to={`/destinations/${dest.id}`} className="card-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="section">
        <h2>Featured Packages</h2>
        <div className="card-grid">
          {packages.map(pkg => (
            <div key={pkg.id} className="card">
              <img src={pkg.images[0] ? `http://localhost:5255/${pkg.images[0]}` : ""} alt={pkg.title} />
              <div className="card-info">
                <h3>{pkg.title}</h3>
                <p>Price: ${pkg.price}</p>
                <p>Duration: {pkg.durationDays} days</p>
                <Link to={`/packages/${pkg.id}`} className="card-btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};
