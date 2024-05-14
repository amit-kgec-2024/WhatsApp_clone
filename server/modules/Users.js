const mongoose = require("mongoose");

const usersSchame = mongoose.Schema({
  mobile: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const Users = mongoose.model("Users", usersSchame);

module.exports = Users;
