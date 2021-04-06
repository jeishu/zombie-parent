const router = require("express").Router();
const childrenController = require("../../controllers/childrenController");

router
  .route("/")
  .post(childrenController.create);

router
  .route("/:id")
  .get(childrenController.findById)
  .put(childrenController.update)
  .delete(childrenController.remove);

router
  .route("/checkcode/:id")
  .get(childrenController.checkCode);

module.exports = router;
