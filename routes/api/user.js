const router = require("express").Router();
const userController = require("../../controllers/userController");
const axios = require("axios");

// Matches with "/api/dbrecipes"
router.get("/:user", userController.findAll);

router.post("/user", userController.createUser);
// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

router.post("/searching", (req, res) => {
  console.log("Request: ", req.body);

  let allergy = "";

  if (req.body.dairy_free === true) {
    allergy += "&health=dairy-free";
  }
  if (req.body.gluten_free === true) {
    allergy += "&health=gluten-free";
  }
  if (req.body.peanut_free === true) {
    allergy += "&health=peanut-free";
  }
  if (req.body.shellfish_free === true) {
    allergy += "&health=shellfish-free";
  }

  const apiURL = "https://api.edamam.com/search?";
  const apiKey = "&app_key=f6179a854d5788d08869b56fcda3ecc2";
  const apiID = "&app_id=726e9cff";
  let to = "&to=50";
  let query = "q=" + req.body.searchQuery;
  let diet = "&diet=" + req.body.dietType;

  return axios.get(apiURL + query + apiID + apiKey + to + diet + allergy);
});

module.exports = router;
