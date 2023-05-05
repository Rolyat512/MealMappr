const router = require('express').Router();

const userRoutes = require('./userRoutes');
const mealRoutes = require('./mealRoutes')

router.use('/', userRoutes); // keep as / so we don't need more routes in url 
router.use('/', mealRoutes);

module.exports = router;