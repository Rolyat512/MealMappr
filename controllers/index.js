const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

router.use("/", homeRoutes);
router.use("/users", apiRoutes); // call this users so it makes more sense in the url

module.exports = router;
