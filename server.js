import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import CORS middleware
import authRoute from "./Routes/authenication.route.js";
import mediaRoute from "./Routes/media.route.js";
import uploadRoute from "./Routes/upload.route.js";
import path from "path";
import fs from "fs";

const app = express();

// ✅ Configure CORS Middleware
app.use(
  cors({
    origin:[ "http://localhost:3000","https://health-care-website-frontend.onrender.com"], // Allow frontend requests
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// ✅ Middlewares
app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parses Form data
app.use(cookieParser());

// ✅ Routers
app.use("/authenication", authRoute);
app.use("/media", mediaRoute);
app.use("/upload", uploadRoute);

// ✅ Serve Static Uploads
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDirectory = path.join(__dirname, "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

// ✅ Route to serve uploaded files
app.get("/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadDirectory, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath, filename, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error downloading the file.");
      }
    });
  } else {
    res.status(404).json({ success: false, message: "File not found" });
  }
});

// ✅ Route to get a list of all video files
app.get("/get-videos", (req, res) => {
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Unable to read the directory",
      });
    }

    // Filter video files (.mp4, .avi, .mkv)
    const videoFiles = files.filter((file) =>
      [".mp4", ".avi", ".mkv"].includes(path.extname(file).toLowerCase())
    );

    res.json({ success: true, videos: videoFiles });
  });
});

export default app;
