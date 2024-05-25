const express = require("express");
const router = express.Router();
const Channels = require("../modules/Channels");
const Users = require("../modules/Users");

// Create Channels...............................................
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
// Get admin Channels................................................
router.get("/admin/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const channels = await Channels.find({
      $or: [{ channeladminId: userId }, { channelmembers: userId }],
    });

    if (!channels || channels.length === 0) {
      return res.status(404).json({ error: "Channels not found" });
    }

    res.status(200).json({ channels });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// All Channel shows.................................
router.get("/all/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const channels = await Channels.find({
      $nor: [{ channeladminId: userId }, { channelmembers: userId }],
    });

    if (!channels || channels.length === 0) {
      return res.status(404).json({ error: "Channels not found" });
    }

    res.status(200).json({ channels });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
// Add channel members...................................
router.post("/addmember/:id", async (req, res) => {
  try {
    const channelId = req.params.id;
    const { channelmembers } = req.body;

    if (!channelId) {
      return res.status(400).json({ error: "Channel ID not provided" });
    }

    if (!channelmembers) {
      return res.status(400).json({ error: "Channel member ID not provided" });
    }

    const channel = await Channels.findById(channelId);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    channel.channelmembers.push(channelmembers);
    await channel.save();

    res.status(200).json({ message: "Member added successfully", channel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Channel details show...........................
router.get("/details/:_id", async (req, res) => {
  try {
    const _id = req.params._id;

    const channelDetails = await Channels.findById(_id);
    if (!channelDetails) {
      return res.status(404).send("User not found");
    }

    const adminChannels = await Users.findById(channelDetails.channeladminId);

    const memberDetails = await Users.find({_id: { $in: channelDetails.channelmembers },});

    const combinedDetails = {
      channelDetails,
      adminChannels,
      memberDetails,
    };

    res.status(200).json(combinedDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
