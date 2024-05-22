const mongoose = require("mongoose");

const usersSchame = mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
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
  usertheme: {
    type: String,
    require: true,
  },
  userthemelabel: {
    type: String,
    require: true,
  },
});

const Users = mongoose.model("Users", usersSchame);

module.exports = Users;
