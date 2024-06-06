const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  channeladminId: {
    type: String,
    required: true,
  },
  channelimage: {
    type: String,
    required: false,
  },
  channelname: {
    type: String,
    required: true,
    unique: true
  },
  channelabout: {
    type: String,
    required: true,
  },
  channelmembers: [
    {
      type: String,
      required: true,
    }
  ]
});

const Channels = mongoose.model("Channels", ChannelSchema);


module.exports = Channels;