const router = require("express").Router();
const { Recipe } = require("../../models");
const withAuth = require("../../utils/auth");

//GET saved recipes route
router.get("/myrecipes", withAuth, async (req, res) => {
  try {
    // Find all recipes in the database
    const savedRecipes = await Recipe.findAll({
      where: { user_id: req.session.user_id },
    });
    res.status(200).json(savedRecipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving meals", error: err });
  }
});

router.post("/myrecipes", withAuth, async (req, res) => {
  try {
    //res.json({message: "You just saved a meal!"})

    const newRecipe = await Recipe.create(req.body);

    res.status(200).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
