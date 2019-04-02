const db = require("../models");
const axios = require("axios");
const config = require("../config");
let preferences;
const client = require("twilio")(config.accountSid, config.authToken);

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.User.findOne({ email: req.params.user })
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  createUser: function(req, res) {
    db.User.findOne({ email: req.body.email })
      .then(dbUser => {
        if (!dbUser) {
          db.User.create({
            email: req.body.email,
            preferences: preferences
          });
          res.json("new user was added");
        } else {
          res.json("existing user");
        }
      })
      .catch(err => res.status(422).json(err));
  },
  retrieveRecipes: function(req, res) {
    let allergy = "";
    let diet = "";

    if (req.body.vegan === true) {
      allergy += "&health=vegan";
    }
    if (req.body.vegetarian === true) {
      allergy += "&health=vegetarian";
    }
    if (req.body.sugar_conscious === true) {
      allergy += "&health=sugar-conscious";
    }
    if (req.body.peanut_free === true) {
      allergy += "&health=peanut-free";
    }
    if (req.body.tree_nut_free === true) {
      allergy += "&health=tree-nut-free";
    }
    if (req.body.alcohol_free === true) {
      allergy += "&health=alcohol-free";
    }
    if (req.body.dietType) {
      diet += "&diet=" + req.body.dietType;
    }

    const apiURL = "https://api.edamam.com/search?";
    const apiKey = "&app_key=f6179a854d5788d08869b56fcda3ecc2";
    const apiID = "&app_id=726e9cff";
    let to = "&to=48";
    let query = "q=" + req.body.searchQuery;

    axios
      .get(apiURL + query + apiID + apiKey + to + diet + allergy)
      .then(response => {
        res.json(response.data);
      });
  },
  updateFavorites: function(req, res) {
    db.User.findOneAndUpdate(
      { email: req.params.user },
      { $addToSet: { favorites: req.body.fav } }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateMeal: function(req, res) {
    let day = req.body.dayUpdate;
    let meal = req.body.mealUpdate;
    db.User.findOneAndUpdate(
      { email: req.params.user },
      // { $Set: { weeklymenu.day.meal: req.body.fav } }
      //TODO add update code
      console.log(req.body)
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateMenu: function(req, res) {
    console.log(req.body.weeklyMenu);
    db.User.findOneAndUpdate(
      { email: req.params.user },
      { weeklymenu: req.body.weeklyMenu }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateSettings: function(req, res) {
    db.User.findOneAndUpdate(
      { email: req.params.user },
      { preferences: req.body.preferences }
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  createPreferences: function(req, res) {
    preferences = req.body.preferences;
    console.log("Forumalated Obj: ", preferences);
  },
  sendSMS: function(req, res) {
    client.messages
      .create({
        body: req.body.text,
        from: config.twilioNumber,
        to: req.body.phone
      })
      .then(message => res.json(message.sid));
  }

  // updateWeekMealsFavorites: function(req, res) {
  //   db.Book.findOneAndUpdate({ email: req.body.email })
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // },
  // findById: function(req, res) {
  //   db.Book.findById(req.params.id)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // create: function(req, res) {
  //   db.User.create(req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
  // update: function(req, res) {
  //   db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // },
  // remove: function(req, res) {
  //   db.Book.findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }
};
