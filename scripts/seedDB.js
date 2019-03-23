const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mealprepdb");

const userSeed = [
  {
    email: "test.com",
    favorites: [
      {
        uri:
          "http://www.edamam.com/ontologies/edamam.owl#recipe_b65931a130aed7b1f69b553111f4f0bc",
        calories: "456",
        protein: "2",
        fat: "4",
        carb: "356",
        label: "pizza",
        url: "http://www.marthastewart.com/353269/baked-potato-snack",
        time: "34",
        ingredients: ["salt"],
        image: "image"
      },
      {
        uri:
          "http://www.edamam.com/ontologies/edamam.owl#recipe_b65931a130aed7b1f69b553111f4f0bc",
        calories: "584",
        protein: "23",
        fat: "5",
        carb: "46",
        label: "potato",
        url: "test",
        time: "test",
        ingredients: ["pepper", "potato"]
      }
    ],
    userPreference: ["veg", "keto"],
    weeklymenu: {
      monday: {
        breakfast: {
          uri:
            "http://www.edamam.com/ontologies/edamam.owl#recipe_b65931a130aed7b1f69b553111f4f0bc",
          calories: "584",
          protein: "23",
          fat: "5",
          carb: "46",
          label: "potato",
          url: "test",
          time: "test",
          ingredients: ["pepper", "potato"]
        },
        lunch: {
          uri:
            "http://www.edamam.com/ontologies/edamam.owl#recipe_b65931a130aed7b1f69b553111f4f0bc",
          calories: "584",
          protein: "23",
          fat: "5",
          carb: "46",
          label: "protein",
          url: "test",
          time: "test",
          ingredients: ["pepper", "potato"]
        },
        dinner: {
          uri:
            "http://www.edamam.com/ontologies/edamam.owl#recipe_b65931a130aed7b1f69b553111f4f0bc",
          calories: "584",
          protein: "23",
          fat: "5",
          carb: "46",
          label: "pepperoni",
          url: "test",
          time: "test",
          ingredients: ["pepper", "potato"]
        }
      },
      tuesday: {
        breakfast: {
          uri:
            "http://www.edamam.com/ontologies/edamam.owl#recipe_b65931a130aed7b1f69b553111f4f0bc",
          calories: "584",
          protein: "23",
          fat: "5",
          carb: "46",
          label: "pizza",
          url: "test",
          time: "test",
          ingredients: ["pepper", "potato"]
        },
        lunch: {
          uri:
            "http://www.edamam.com/ontologies/edamam.owl#recipe_b65931a130aed7b1f69b553111f4f0bc",
          calories: "584",
          protein: "23",
          fat: "5",
          carb: "46",
          label: "meshed potato",
          url: "test",
          time: "test",
          ingredients: ["pepper", "potato"]
        },
        dinner: {
          uri:
            "http://www.edamam.com/ontologies/edamam.owl#recipe_b65931a130aed7b1f69b553111f4f0bc",
          calories: "584",
          protein: "23",
          fat: "5",
          carb: "46",
          label: "pie",
          url: "test",
          time: "test",
          ingredients: ["pepper", "potato"]
        }
      }
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
