import express from "express";
import multer from "multer";
import path from "path";
import authmid from "../Middleware/authenication_middleware.js";
import Media from "../Models/media.model.js"; // Media model to save to database

const router = express.Router();


// File filter function
const fileFilter = (req, file, cb) => {
  const allowedTypes = [".jpg", ".jpeg", ".png", ".mp4"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.includes(ext)) {
    return cb(new Error("Only JPG, PNG, and MP4 files are allowed"), false);
  }
  cb(null, true);
};

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage, fileFilter }).single("file");

// File upload route
router.post("/uploadfiles", authmid, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    return res.json({
      success: true,
      filePath: req.file.path,
      fileName: req.file.filename,
    });
  });
});



export default router;
