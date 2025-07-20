const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  chat: { type: String },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: mongoose.Types.ObjectId, ref: "User" },
  created_to: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Chat", chatSchema);
