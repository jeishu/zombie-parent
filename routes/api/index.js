const router = require("express").Router();
const userRoutes = require("./users");
const childRoutes = require("./children");
const actionRoutes = require("./actions");


router.use("/user", userRoutes);
router.use("/child", childRoutes);
router.use("/action", actionRoutes);


module.exports = router;
