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
// Removes Channel Members.........................
router.post("/deletemember/:_id", async (req, res) => {
  try {
    const channelId = req.params._id;
    const { memberId } = req.body; 
    if (!channelId) {
      return res.status(400).json({ error: "Channel ID not provided" });
    }

    if (!memberId) {
      return res.status(400).json({ error: "Channel member ID not provided" });
    }

    const channel = await Channels.findById(channelId);

    if (!channel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    const memberIndex = channel.channelmembers.indexOf(memberId);
    if (memberIndex === -1) {
      return res.status(404).json({ error: "Member not found in channel" });
    }

    channel.channelmembers.splice(memberIndex, 1);
    await channel.save();

    res.status(200).json({ message: "Member removed successfully", channel });
  } catch (error) {
    console.error("Error removing member from channel:", error);
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

// Delete channel...................
router.delete("/delete/:_id", async (req, res)=>{
  try {
    const _id = req.params._id;
    const existingChannel = await Channels.findById(_id);
    if (!existingChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }
    await Channels.deleteOne({_id});
    return res.status(200).send("Channel deleted successfully!");
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
})
// Channel Name edit..........................
router.post("/update/name/:_id", async (req, res)=> {
  try {
    const _id = req.params._id;
     const { channelname } = req.body;
    if (!channelname) {
      return res.status(400).json({ error: "New channel name is required" });
    }

    const existingChannel = await Channels.findById(_id);
    if (!existingChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    existingChannel.channelname = channelname;
    await existingChannel.save(); 

    return res.status(200).json({ message: "Channel name updated successfully!" });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
})
// Channel About edit..........................
router.post("/update/about/:_id", async (req, res)=> {
  try {
    const _id = req.params._id;
     const { channelabout } = req.body;
    if (!channelabout) {
      return res.status(400).json({ error: "New channel about is required" });
    }

    const existingChannel = await Channels.findById(_id);
    if (!existingChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    existingChannel.channelabout = channelabout;
    await existingChannel.save(); 

    return res.status(200).json({ message: "Channel about updated successfully!" });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
})
// Channel Images edit..........................
router.post("/update/profileImage/:_id", async (req, res)=> {
  try {
    const _id = req.params._id;
     const { channelimage } = req.body;
    if (!channelimage) {
      return res.status(400).json({ error: "New channel images is required" });
    }

    const existingChannel = await Channels.findById(_id);
    if (!existingChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    existingChannel.channelimage = channelimage;
    await existingChannel.save(); 

    return res.status(200).json({ message: "Channel images updated successfully!" });
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
})
// Channel Remove edit..........................
router.delete("/remove/profileImage/:_id", async (req, res) => {
  try {
    const _id = req.params._id;

    const existingChannel = await Channels.findById(_id);

    if (!existingChannel) {
      return res.status(404).json({ error: "Channel not found" });
    }

    existingChannel.channelimage = undefined; 
    await existingChannel.save(); 

    return res.status(200).send("Profile image removed successfully!");
  } catch (error) {
    return res.status(500).send("Internal Server Error!");
  }
});
module.exports = router;
