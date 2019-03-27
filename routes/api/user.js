const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/dbrecipes"
router.get("/:user", userController.findAll);

router.post("/user", userController.createUser);
// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
