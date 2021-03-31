const router = require("express").Router();
const userRoutes = require("./users");
const childRoutes = require("./children");
const actionRoutes = require("./actions");


router.use("/users", userRoutes);
router.use("/childs", childRoutes);
router.use("/actions", actionRoutes);


module.exports = router;
