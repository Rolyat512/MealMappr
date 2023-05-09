const router = require("express").Router();
const { Recipe } = require("../../models");
const withAuth = require("../../utils/auth");

//GET saved recipes route
router.get("/myrecipes", async (req, res) => {
  try {
    const savedRecipes = await Recipe.findAll({
      where: { user_id: req.session.user_id },
    });
    if (!savedRecipes) {
      console.log("no recipes found");
    }

    res.status(200).json(savedRecipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving meals", error: err });
  }
});

router.post("/myrecipes", async (req, res) => {
  try {
    //res.json({message: "You just saved a meal!"})

    const newRecipe = await Recipe.create(req.body);

    res.header("Content-Type", "application/json").status(200).json(newRecipe);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
