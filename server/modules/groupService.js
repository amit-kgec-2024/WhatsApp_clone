// groupService.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  adminId: { type: String, required: true },
  userId: { type: String, required: true },
});

const Group = mongoose.model("Group", groupSchema);

const createGroup = async (adminId, groups) => {
  try {
    const groupDocuments = groups.map((group) => ({
      adminId,
      userId: group.userId,
    }));

    await Group.insertMany(groupDocuments);

    return { message: "Group created successfully" };
  } catch (error) {
    console.error("Error creating group:", error);
    throw new Error("Error creating group");
  }
};

module.exports = {
  createGroup,
  Group,
};
