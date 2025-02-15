import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/VideoPage.css";

const VideoPage = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch(`http://localhost:8000/media/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch media");

        const data = await response.json();
        setMedia(data);
        setLiked(data.likes.includes(localStorage.getItem("userId")));
        setLikeCount(data.likes.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [id]);

  const handleLikeToggle = async () => {
    try {
      const endpoint = liked ? "unlike" : "like";
      const response = await fetch(`http://localhost:8000/media/${id}/${endpoint}`, {
        method: "PUT",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update like status");

      const updatedMedia = await response.json();
      setMedia(updatedMedia);
      setLiked(!liked);
      setLikeCount(updatedMedia.likes.length);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="video-page-container">
      <h1 className="video-title">{media.title}</h1>
      <p className="video-description">{media.body}</p>
      <div className="video-wrapper">
        <video className="video-player" controls autoPlay>
          <source src={media.media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="buttons-container">
        <p className="like-count">Likes: {likeCount}</p>
        <button 
          className={`like-button ${liked ? "liked" : ""}`} 
          onClick={handleLikeToggle}
        >
          {liked ? "Unlike" : "Like"}
        </button>
      </div>
    </div>
  );
};

export default VideoPage;