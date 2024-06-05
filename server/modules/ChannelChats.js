const mongoose = require("mongoose");

const channelChatSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const ChannelChats = mongoose.model("ChannelChats", channelChatSchema);

module.exports = ChannelChats;
