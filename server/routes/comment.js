const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const RoadmapItem = require("../models/RoadmapItem");
const auth = require("../middleware/authMiddleware");


router.get("/item/:itemId", async (req, res) => {
  try {
    const comments = await Comment.find({ roadmapItem: req.params.itemId })
      .populate("user", "email") 
      .sort({ createdAt: -1 });  
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

// Add comment
router.post("/", auth, async (req, res) => {
  const { text, roadmapItemId, parentId } = req.body;
  try {
    const comment = new Comment({
      user: req.user.id,
      text,
      roadmapItem: roadmapItemId,
      parent: parentId || null,
    });

    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      parentComment.replies.push(comment._id);
      await parentComment.save();
    }

    await comment.save();

    const roadmapItem = await RoadmapItem.findById(roadmapItemId);
    roadmapItem.comments.push(comment._id);
    await roadmapItem.save();

    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});

// Edit comment
router.put("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment || comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    comment.text = req.body.text;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Edit failed" });
  }
});

// Delete comment
router.delete("/:id", auth, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment || comment.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await comment.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
