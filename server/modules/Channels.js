const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  channeladminId: {
    type: String,
    required: true,
  },
  channelimage: {
    type: String,
    required: true,
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
});

const Channels = mongoose.model("Channels", ChannelSchema);


module.exports = Channels;