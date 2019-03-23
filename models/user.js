const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  favorites: [String],
  userPreference: [String],
  weeklymenu: {
    breakfast: [String],
    lunch: [String],
    dinner: [String]
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
