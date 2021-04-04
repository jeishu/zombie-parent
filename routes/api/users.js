const router = require("express").Router();
const usersController = require("../../controllers/usersController");


router
  .route("/")
  .post(usersController.create);

router
  .route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

router
  .route("/auth/:id")
  .get(usersController.findByUid);

module.exports = router;
