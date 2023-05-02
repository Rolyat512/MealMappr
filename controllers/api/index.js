const router = require('express').Router();

const userRoutes = require('./userRoutes');

router.use('/', userRoutes); // keep as / so we don't need more routes in url 

module.exports = router;