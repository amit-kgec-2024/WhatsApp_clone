const express = require("express");
const router = express.Router();
const Users = require("../modules/Users");
const Group = require("../modules/Group");
const GroupChats = require("../modules/GroupChats");

// Create Groups............................................/api/create/groups
router.post("/create/groups/:adminId", async (req, res) => {
  const { adminId } = req.params;
  const { userIds, groupimage, groupname } = req.body;
  try {
    const group = await Group.create({
      adminId,
      userIds,
      groupimage,
      groupname,
      groupabout: null,
    });
    res.status(201).json({ success: true, data: group });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
// groups Update request About....................
router.put("/groups/updat/about/:id", async (req, res) => {
  const { id } = req.params;
  const { groupabout } = req.body;

  try {
    const group = await Group.findByIdAndUpdate(
      id,
      { groupabout },
      { new: true }
    );

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
// Update Group Profile Name....................
router.put("/groups/name/update/:id", async (req, res) => {
  const { id } = req.params;
  const { groupname } = req.body;

  try {
    const group = await Group.findByIdAndUpdate(
      id,
      { groupname },
      { new: true }
    );

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
// Update Group Profile Images....................
router.put("/groups/update/profile/images/:id", async (req, res) => {
  const { id } = req.params;
  const { groupimage } = req.body;

  try {
    const group = await Group.findByIdAndUpdate(
      id,
      { groupimage },
      { new: true }
    );

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
// Remove group profile image.....................
router.put("/groups/update/profile/images/remove/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findByIdAndUpdate(
      id,
      { groupimage: null },
      { new: true }
    );

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
// Group Shows...New.......
router.get("/show/groups/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const groups = await Group.find({
      $or: [{ adminId: id }, { userIds: id }, { _id: id }],
    });

    if (!groups.length) {
      return res
        .status(404)
        .json({ success: false, message: "No groups found for this id." });
    }

    const userDetailsPromises = groups.map(async (group) => {
      const adminDetails = await Users.findById(group.adminId);
      const userDetailPromises = group.userIds.map((userId) =>
        Users.findById(userId)
      );
      const userDetails = await Promise.all(userDetailPromises);

      return {
        ...group._doc,
        adminDetails,
        userDetails,
      };
    });

    const detailedGroups = await Promise.all(userDetailsPromises);

    res.status(200).json({ success: true, data: detailedGroups });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
// Remove group Users.......................................
router.post("/remove/groups/users/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const { userIds } = req.body;

  try {
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { userIds: { $in: userIds } } },
      { new: true }
    );

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
// remove admin....group.............................
router.post("/groups/remove-admin/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const { adminId } = req.body;

  try {
    const group = await Group.findOneAndUpdate(
      { _id: groupId, adminId: adminId },
      { $unset: { adminId: "" } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found or adminId mismatch",
      });
    }

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
// Exit Group ....in...Users.......................
router.post("/groups/remove-ids/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const { adminId, userIds } = req.body;

  try {
    let update = {};

    if (adminId) {
      update.$unset = { adminId: "" };
    }

    if (userIds && userIds.length > 0) {
      update.$pull = { userIds: { $in: userIds } };
    }

    const group = await Group.findOneAndUpdate({ _id: groupId }, update, {
      new: true,
    });

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    res.status(200).json({ success: true, data: group });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
