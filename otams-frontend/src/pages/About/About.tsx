import "./about.css";

export const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About TravelTales</h1>
        <p>
          TravelTales is your ultimate travel companion. We provide curated travel experiences, 
          handpicked destinations, and exclusive packages designed to make your journey unforgettable.
        </p>
      </section>

      <section className="about-section">
        <div className="about-grid">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              To inspire and empower travelers worldwide by providing seamless access to incredible travel experiences.
            </p>
          </div>
          <div className="about-card">
            <h2>Our Vision</h2>
            <p>
              To become the most trusted platform for travelers seeking adventure, relaxation, and cultural exploration.
            </p>
          </div>
        </div>
      </section>
      <footer className="footer">
        © {new Date().getFullYear()} Pinki Akter. All rights reserved.
      </footer>
    </div>
  );
};
