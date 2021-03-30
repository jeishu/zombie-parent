const router = require("express").Router();
const actionsController = require("../../controllers/actionsController");

router
  .route("/")
  .post(actionsController.create);

router
  .route("/:id")
  .get(actionsController.findById)
  .put(actionsController.update)
  .delete(actionsController.remove);

router
  .route("/lastday/:id")
  .get(actionsController.findActionsLastDay);

module.exports = router;
