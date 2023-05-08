const router = require('express').Router();

const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes');
const recipeRoutes = require('./recipeRoutes');

router.use('/', userRoutes); // keep as / so we don't need more routes in url
router.use('/', mealRoutes);
router.use('/', recipeRoutes);

module.exports = router;