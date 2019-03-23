const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mealprepdb");

const userSeed = [
  {
    email: "test",
    favorites: ["2312312", "234234"],
    userPreference: ["veg", "keto"],
    weeklymenu: {
      breakfast: ["2312312", "234234"],
      lunch: ["2312312", "234234"],
      dinner: ["2312312", "234234"]
    },
    date: new Date(Date.now())
  },
  {
    email: "test",
    favorites: ["2312312", "234234"],
    userPreference: ["veg", "keto"],
    weeklymenu: {
      breakfast: ["2312312", "234234"],
      lunch: ["2312312", "234234"],
      dinner: ["2312312", "234234"]
    },
    date: new Date(Date.now())
  }
];

db.User.remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
