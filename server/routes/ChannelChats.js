const express = require("express");
const router = express.Router();
const ChannelChats = require("../modules/ChannelChats");

// Chat create............................
router.post("/create", async (req, res) => {
  try {
    const { channelId, message } = req.body;

    const newChannelChat = new ChannelChats({
      channelId,
      message,
    });

    await newChannelChat.save();
    res.status(201).json({ message: "Channel chat message sent successfully" });
  } catch (err) {
    console.error("Error sending channel chat message:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Ghat GET..............................
router.get("/chatShow/:channelId", async (req, res) => {
  try {
    const channelId = req.params.channelId;

    const channelChats = await ChannelChats.find({ channelId });

    const formattedChannelChats = channelChats.map((chat) => ({
      ...chat.toObject(),
      timestamp: chat.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    res.status(200).json(formattedChannelChats);
  } catch (err) {
    console.error("Error retrieving channel chat messages:", err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
