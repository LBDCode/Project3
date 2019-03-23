const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipe = new Schema({
  uri: String,
  calories: String,
  protein: String,
  fat: String,
  carb: String,
  label: String,
  url: String,
  time: String,
  ingredients: [String],
  image: String
});
const userSchema = new Schema({
  email: String,
  favorites: [recipe],
  userPreference: [String],
  weeklymenu: {
    monday: {
      breakfast: recipe,
      lunch: recipe,
      dinner: recipe
    },
    tuesday: {
      breakfast: recipe,
      lunch: recipe,
      dinner: recipe
    },
    wednesday: {
      breakfast: recipe,
      lunch: recipe,
      dinner: recipe
    },
    thursday: {
      breakfast: recipe,
      lunch: recipe,
      dinner: recipe
    },
    friday: {
      breakfast: recipe,
      lunch: recipe,
      dinner: recipe
    },
    saturday: {
      breakfast: recipe,
      lunch: recipe,
      dinner: recipe
    },
    sunday: {
      breakfast: recipe,
      lunch: recipe,
      dinner: recipe
    }
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
