const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const GroupChats = mongoose.model("GroupChats", groupChatSchema);

module.exports = GroupChats;
