const mongoose = require("mongoose");

const usersSchame = mongoose.Schema({
  mobile: {
    type: Number,
    require: true,
  },
  token: {
    type: String,
  },
  username: {
    type: String,
    require: true,
  },
  userimage: {
    type: String,
    require: true,
  },
  userabout: {
    type: String,
    require: true,
  },
});

const Users = mongoose.model("Users", usersSchame);

module.exports = Users;
