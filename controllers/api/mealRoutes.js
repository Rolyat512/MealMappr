const router = require("express").Router();
const { Meal } = require("../../models");

// Define a POST route for creating a meal
router.post("/meal", async (req, res) => {
  try {
    // Create a new meal with the information provided in the request body
    const dbMeals = await Meal.create(req.body);
    // Return a JSON response with the newly created meal
    res.status(200).json(dbMeals);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET meals route
router.get("/meals", async (req, res) => {
  try {
    // Find all meals in the database
    const meals = await Meal.findAll({});
    // Return a JSON response with all the meals
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving meals" });
  }
});

module.exports = router;
