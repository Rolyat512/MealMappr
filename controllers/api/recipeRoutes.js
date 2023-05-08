const router = require("express").Router();
const { Recipe } = require("../../models");

//GET saved recipes route
router.get("/myrecipes", async (req, res) => {
  try {
    // Find all recipes in the database
    const recipes = await Recipe.findAll({
      where: { user_id: req.session.user_id },
    });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving meals" });
  }
});

router.post("/myrecipes", withAuth, async (req, res) => {
  try {
    //res.json({message: "You just saved a meal!"})
    const newRecipe = await Recipe.Create({
      recipe_title: req.body.recipe_title,
      image: req.body.recipe.image,
      dietLables: req.body.recipe.dietLables,
      healthLables: req.body.recipe.healthLables,

      cautions: req.body.recipe.cautions,
      ingredients: req.body.recipe.ingredients,
      calories: req.body.recipe.calories,
      cuisineType: req.body.recipe.cuisine_type,
      mealType: req.body.recipe.meal_type,
      macros: req.body.recipe.macros,
      user_id: req.session.user_id,
    });

    // res.status(200).json(recipeData);
    res.status(201).json({ message: "Recipe saved", recipe: newRecipe });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
