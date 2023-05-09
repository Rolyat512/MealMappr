const router = require("express").Router();
const { Meal, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Define a POST route for creating a meal
router.post("/meal", withAuth, async (req, res) => {
    try {
      // Create a new meal with the information provided in the request body
      const dbMeals = await Meal.create({
        foodTitle: req.body.foodTitle,
        itemDescription: req.body.itemDescription,
        proteinValue: req.body.proteinValue,
        Calories: req.body.Calories,
        Carbs: req.body.Carbs,
        mealType: req.body.mealType,
        date: req.body.date,
        user_id: req.session.userId // added user_id for logged in user -kd
      });
      // Return a JSON response with the newly created meal
      res.status(200).json(dbMeals);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//GET meals route by logged in user
router.get("/meals", withAuth, async (req, res) => {
  try {
    // Find all meals in the database
    const meals = await Meal.findAll({ 
      include: [{model: User, attributes: ['id']}],
      where: { user_id: req.session.userId },
      raw: true,
      nest: true,
    });
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving meals" });
  }
});

// when the event is clicked within the calendar
// this route will find the id of the meal, 
// and appear in the modal with data
router.get("/meals/:id", withAuth, async (req, res) => {
  try {
    // Find all meals in the database
    const meals = await Meal.findByPk(req.params.id, {
      raw: true,
      nest: true
    });
    const mealId = req.params.id
    //res.status(200).json(meals);
    if (mealId) {
      //res.status(200).json(meals);
      res.render('homepage', {meals})
    }
   
  } catch (err) {
    res.status(500).json({ message: "Error retrieving meals" });
  }
});

// This route updates the Meal that is equal to the ID
router.put('/meals/:id', withAuth, async (req, res) => {
  try {
    const updateMeal = await Meal.update( 
      { foodTitle: req.body.foodTitle,
        itemDescription: req.body.itemDescription,
        proteinValue: req.body.proteinValue,
        Calories: req.body.Calories,
        Carbs: req.body.Carbs,
        mealType: req.body.mealType
      },
      {where: {id: req.params.id}} 
      );
    if(!updateMeal) {
      res.status(404).json({message: 'No meal to update with this ID'});
      return;
    }
    res.status(200).json({message: 'meal has been updated'})
  } catch (err) {
    res.status(500).json({message:"An error has occured"});
    console.log(err);
  }
});

// This route will delete the meal that is equal to the ID
router.delete('/meals/:id', withAuth, async (req, res) => {
try {
    const deleteMeal = await Meal.destroy({where: {id: req.params.id}});
    if(!deleteMeal) {
    res.status(404).json({message: 'No meal with this ID found'});
    return;
    }
    res.status(200).json({message: 'The meal has been deleted'})
} catch (err) {
    res.status(500).json({message:"An error has occured"});
    console.log(err);
};
});
module.exports = router;
