const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  roadmapItem: { type: mongoose.Schema.Types.ObjectId, ref: "RoadmapItem" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // <- reply parent
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
