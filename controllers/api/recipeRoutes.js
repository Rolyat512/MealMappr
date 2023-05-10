const router = require("express").Router();
const { Recipe } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/myrecipes", withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      label: req.body.label,
      image: req.body.image,
      dietLabels: req.body.dietLabels,
      healthLabels: req.body.healthLabels,
      cautions: req.body.cautions,
      ingredients: req.body.ingredients,
      calories: req.body.calories,
      cuisineType: req.body.cuisineType,
      mealType: req.body.mealType,
      macros: req.body.macros,
      user_id: req.session.userId,
    });

    res.status(201).json({ message: "Recipe saved", recipe: newRecipe });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/myrecipes/:id", withAuth, async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id);

    // Check if a recipe with the provided ID exists
    if (!recipeData) {
      res.status(404).json({ message: "No recipe found with this ID!" });
      return;
    }

     // Get the plain object from the Sequelize instance
     const recipe = recipeData.get({ plain: true });

    res.render("savedrecipe", { recipe, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
