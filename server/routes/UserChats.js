const express = require("express");
const router = express.Router();
const Users = require("../modules/Users");
const Chat = require("../modules/Chat");

// Chats Api call......................
router.post("/post/chats", async (req, res) => {
  const chat = new Chat({
    sender: req.body.sender,
    receiver: req.body.receiver,
    message: req.body.message,
  });
  try {
    const newChat = await chat.save();
    res.status(201).json(newChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Chats get...................
router.get("/get/chats", async (req, res) => {
  try {
    const chats = await Chat.find();

    const formattedChats = chats.map((chat) => ({
      ...chat.toObject(),
      timestamp: {
        date: formatDate(chat.timestamp).date,
        time: formatDate(chat.timestamp).time,
      },
    }));

    res.json(formattedChats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// conversations user..................................
router.get("/get/chats/:id", async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  try {
    const chats = await Chat.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .select("sender receiver message timestamp")
      .sort({ timestamp: -1 });

    const lastMessagesMap = new Map();

    chats.forEach((chat) => {
      const otherParty =
        chat.sender.toString() === userId
          ? chat.receiver.toString()
          : chat.sender.toString();

      if (
        !lastMessagesMap.has(otherParty) ||
        chat.timestamp > lastMessagesMap.get(otherParty).timestamp
      ) {
        lastMessagesMap.set(otherParty, chat);
      }
    });

    const formattedChats = [];

    for (const [otherPartyId, lastMessage] of lastMessagesMap.entries()) {
      const userDetails = await Users.findById(otherPartyId);
      const formattedTimestamp = formatDate(lastMessage.timestamp);
      formattedChats.push({
        othersId: otherPartyId,
        userDetails: userDetails || null,
        lastMessage: {
          message: lastMessage.message,
          timestamp: formattedTimestamp,
          date: formattedTimestamp.date,
          time: formattedTimestamp.time,
        },
      });
    }

    res.json(formattedChats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const formattedDate = `${date.getFullYear()}-${padZero(
    date.getMonth() + 1
  )}-${padZero(date.getDate())}`;
  const formattedTime = `${padZero(date.getHours())}:${padZero(
    date.getMinutes()
  )}`;
  return {
    date: formattedDate,
    time: formattedTime,
  };
}

// Function to pad zero
function padZero(num) {
  return num < 10 ? "0" + num : num;
}

// DELETE cHats..........................
router.delete("/delete/chats/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Please provide a Chat ID" });
    }

    const existingChat = await Chat.findById(id);

    if (!existingChat) {
      return res.status(404).json({ error: "Chat ID not found" });
    }

    await Chat.deleteOne({ _id: id });

    return res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});

module.exports = router;
