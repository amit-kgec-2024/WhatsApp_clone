const express = require("express");
const Channels = require("../modules/Channels");
const router = express.Router();

router.post("/create", async (req, res) => {
  const { channelname, channelimage, channelabout, channeladminId } = req.body;

  try {
    const existingChannel = await Channels.findOne({ channelname });
    if (existingChannel) {
      return res
        .status(400)
        .json({ error: "Channel with this name already exists" });
    }

    const newChannel = new Channels({
      channelname,
      channelimage,
      channelabout,
      channeladminId,
    });
    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
