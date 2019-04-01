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
  time: Number,
  ingredients: [String],
  image: String,
  _id: false
});
const userSchema = new Schema({
  email: String,
  favorites: [recipe],
  preferences: {
    vegan: Boolean,
    vegetarian: Boolean,
    sugar_conscious: Boolean,
    peanut_free: Boolean,
    tree_nut_free: Boolean,
    alcohol_free: Boolean,
    dietType: String
  },
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
