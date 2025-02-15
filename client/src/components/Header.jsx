import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();
 
  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username")); // Update username when storage changes
    };

    // Listen for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Update username on component mount
    setUsername(localStorage.getItem("username"));

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/authenication/logout", {
        method: "POST",
        credentials: "include", // Ensure cookies are included for auth
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      // Clear local storage and update state
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setUsername(null);

      // Reload window
      window.location.reload();

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Link to="/">Clinikk</Link>
        </div>
      
      </div>
      <nav className="nav-links">
        {username ? (
          <div className="auth-links">
            <span>Welcome, {username}</span>
            <button onClick={handleLogout}>Logout</button> 
             <button className="create-post-btn" onClick={() => navigate("/create-post")}>Create Post</button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
