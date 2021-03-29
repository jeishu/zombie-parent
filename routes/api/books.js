const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const childrenController = require("../../controllers/childrenController");
const actionsController = require("../../controllers/actionsController");

router
  .route("/user/")
  .post(usersController.create);

router
  .route("/user/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

router
  .route("/child/")
  .post(childrenController.create);

router
  .route("/child/:id")
  .get(childrenController.findById)
  .put(childrenController.update)
  .delete(childrenController.remove);

router
  .route("/action/")
  .post(actionsController.create);

router
  .route("/action/:id")
  .get(actionsController.findById)
  .put(actionsController.update)
  .delete(actionsController.remove);

module.exports = router;
