import { Router } from "express";
const router = Router();
import Media from "../Models/media.model.js";
import Authorization from "../Middleware/authenication_middleware.js";

// ✅ Get all media - Populate postedBy to get username
router.get("/", Authorization, async (req, res) => {
  try {
    const medias = await Media.find().populate("postedBy", "username"); // Ensure username is included
    res.send(medias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Create new media
router.post("/", Authorization, async (req, res) => {
  try {
    const media = new Media({
      title: req.body.title,
      body: req.body.body,
      media: req.body.mediaUrl,
      postedBy: req.user.id, // Ensure user is associated
    });
    const savedMedia = await media.save();
    res.status(201).send(savedMedia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get media by ID - Populate postedBy
router.get("/:id", Authorization, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate("postedBy", "username");
    if (!media) return res.status(404).json({ error: "Media not found" });
    res.send(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Like a media - Prevent duplicate likes
router.put("/:id/like", Authorization, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    if (!media.likes.includes(req.user.id)) {
      media.likes.push(req.user.id);
      await media.save();
    }

    res.send(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Unlike a media
router.put("/:id/unlike", Authorization, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    // Convert ObjectId to string before filtering
    media.likes = media.likes.filter(userId => userId.toString() !== req.user.id);
    await media.save();

    res.send(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete media - Only the owner can delete
router.delete("/:id", Authorization, async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    if (media.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized to delete" });
    }

    await media.deleteOne();
    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
