const express = require("express");
const router = express.Router();
const Users = require("../modules/Users");
const GroupChats = require("../modules/GroupChats");

// Group Chats conversations...............................
router.post("/group/chats/post/:groupId", async (req, res) => {
  const { userId, message } = req.body;
  const { groupId } = req.params;

  const groupChat = new GroupChats({
    sender: userId,
    receiver: groupId,
    message: message,
  });

  try {
    const newGroupChat = await groupChat.save();
    res.status(201).json(newGroupChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Group chats request GET................................
router.get("/group/chats/get/:groupId", async (req, res) => {
  const { groupId } = req.params;

  try {
    const groupChats = await GroupChats.find({ receiver: groupId });

    if (groupChats.length === 0) {
      return res.status(200).json([]);
    }

    const chatsWithSenderDetails = await Promise.all(
      groupChats.map(async (chat) => {
        const senderDetails = await Users.findById(chat.sender);
        const chatObj = chat.toObject();

        const timestamp = new Date(chatObj.timestamp);
        const date = timestamp.toLocaleDateString();
        const time = timestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          ...chatObj,
          senderDetails: senderDetails ? senderDetails.toObject() : null,
          timestamp: {
            date,
            time,
          },
        };
      })
    );

    res.status(200).json(chatsWithSenderDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});
// DELETE cHats..........................
router.delete("/delete/group/chats/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Please provide a Chat ID" });
    }

    const existingChat = await GroupChats.findById(id);

    if (!existingChat) {
      return res.status(404).json({ error: "Chat ID not found" });
    }

    await GroupChats.deleteOne({ _id: id });

    return res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
});


module.exports = router;

// .............Group Cre chats data show.........................
router.get("/group/card/chat/data/:groupId", async (req, res) => {
  const { groupId } = req.params;

  try {
    const groupChats = await GroupChats.find({ receiver: groupId }).sort({
      timestamp: -1,
    });

    if (groupChats.length === 0) {
      return res.status(200).json({ lastMessage: null });
    }

    const lastMessage = groupChats[0];

    const lastMessageSenderDetails = await Users.findById(lastMessage.sender);
    const lastMessageObj = lastMessage.toObject();

    const lastMessageTimestamp = new Date(lastMessageObj.timestamp);
    const lastMessageTime = lastMessageTimestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const lastMessageDetails = {
      ...lastMessageObj,
      senderDetails: lastMessageSenderDetails
        ? lastMessageSenderDetails.toObject()
        : null,
      timestamp: lastMessageTime,
    };

    res.status(200).json({ lastMessage: lastMessageDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});
