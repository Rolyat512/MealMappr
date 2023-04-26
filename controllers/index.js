const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('all');
});

module.exports = router;

// Boiler plate code from Act 14.2 
// Might need to update this one 