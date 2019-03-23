const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/dbrecipes"
router.get("/dbrecipes", userController.findAll);
// .post(booksController.create)

// Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

module.exports = router;
