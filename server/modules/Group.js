const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  adminId: {
    type: String,
    required: true,
  },
  groupimage: {
    type: String,
    required: true,
  },
  groupname: {
    type: String,
    required: true,
  },
  userIds: [
    {
      type: String,
      required: true,
    },
  ],
  groupabout: {
    type: String,
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
