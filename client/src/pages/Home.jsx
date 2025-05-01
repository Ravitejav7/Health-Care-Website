import React, { useEffect, useState } from "react";
import Media from "./Media"; // Import the Media component
import "../styles/Home.css"; // Import the CSS file

const Home = () => {
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Check for token

  useEffect(() => {
    if (!token) {
      setLoading(false); // Stop loading if no token
      return;
    }

    const fetchMedia = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/media`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token
          },
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch media");

        const data = await response.json();
        setMediaData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [token]);

  if (!token) {
    return (
      <div className="welcome-container">
        <h1>Welcome to Clinikk</h1>
        <p>
          Clinikk is a Bangalore-based healthcare startup that provides 
         affordable and accessible healthcare solutions. We offer 24/7 
          doctor consultations, health insurance, and in-clinic services** 
          to ensure comprehensive care for individuals and families.
        </p>
        <h2>Our Services:</h2>
        <ul>
          <li>📞  24/7 Doctor Teleconsultations</li>
          <li>🏥  Unlimited OPD Visits at Clinikk Clinics</li>
          <li>🩺  Preventive Health Checkups</li>
          <li>💊  Discounted Medicines & Lab Tests</li>
          <li>📄  Cashless Health Insurance Cover</li>
        </ul>
        <p>
          To access personalized media content, **please log in**. 
          <a href="/login" className="login-link">Click here to log in</a>.
        </p>
      </div>
    );
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Media List</h1>
      <ul>
        {mediaData.length > 0 ? (
          mediaData.map((item) => (
            <li key={item._id}>
              <Media mediaItem={item} />
            </li>
          ))
        ) : (
          <p>No media available.</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
