const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  mail: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
