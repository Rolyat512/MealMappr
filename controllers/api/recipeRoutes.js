const router = require("express").Router();
const { Recipe } = require("../../models");
const withAuth = require("../../utils/auth");

// //GET saved recipes route
// router.get("/myrecipes", async (req, res) => {
//   try {
// // Find the logged in user based on the session ID
// const userData = await User.findByPk(req.session.user_id, {
//   attributes: { exclude: ["password"] },
//   //include: [{ model: Recipe }],
// });

// const user = await userData.get({ plain: true });

// // Fetch the escape rooms from the database
//     const savedRecipes = await Recipe.findAll({
//       where: { user_id: req.session.user_id },
//     });
//     if (!savedRecipes) {
//       console.log("no recipes found");
//     }

//     res.status(200).json(savedRecipes);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error retrieving meals", error: err });
//   }
// });

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
      user_id: req.session.user_id,
   
    });

    res.status(201).json({ message: "Recipe saved", recipe: newRecipe });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
