import React from "react";
import { Link } from "react-router-dom";
import "../styles/Media.css"; // Ensure this file exists

const Media = ({ mediaItem }) => {
  const defaultImages = [
    "https://images.pexels.com/photos/105028/pexels-photo-105028.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1028599/pexels-photo-1028599.jpeg",
    "https://images.pexels.com/photos/1350560/pexels-photo-1350560.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/576831/pexels-photo-576831.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1346295/pexels-photo-1346295.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/1153370/pexels-photo-1153370.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/2377045/pexels-photo-2377045.jpeg?auto=compress&cs=tinysrgb&w=1200"
  ];

  const { _id, title, imageUrl, likes, postedBy } = mediaItem;
  const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
  console.log("Media Item:", mediaItem)
  return (
    

    <div className="media-card">
      <h2>{title}</h2>

      {/* Clicking the image will open the video page */}
      <Link to={`/media/${_id}`}>
        <img src={imageUrl || randomImage} alt={title} width="300" height="200" />
      </Link>

      <p>Likes: {likes.length}</p>
      <p>Posted by: {postedBy?.username}</p>
    </div>
  );
};

export default Media;
// https://www.pexels.com/video/a-woman-meditating-on-a-platform-overseeing-the-rice-field-3209148/