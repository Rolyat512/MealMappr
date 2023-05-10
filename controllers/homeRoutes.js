const router = require("express").Router();
const { User, Recipe, Meal } = require("../models");

const withAuth = require("../utils/auth");

//root page welcome screen
router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("/home");
      return;
    }
    //res.json({message: 'This will be the welcome page'} )
    res.render("welcome"); //this will be for redner the welcome handlebars layout when the site first loads
  } catch (err) {
    res.status(400).json({ message: "No welcome found" });
    console.log(err);
  }
});

// route to bring the user to the their homepage after they signup or login
// route: /home
router.get("/home", withAuth, async (req, res) => {
  try {
    res.render("homepage", { 
      isLoggedIn: req.session.loggedIn,
    }); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

router.get("/reportanissue", async (req, res) => {
  try {
    //res.json({message: 'This will be the home page after user is logged in'} )
    res.render("reportissue", { isLoggedIn: req.session.loggedIn }); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

router.get("/settings", withAuth, async (req, res) => {
  try {
    //res.json({message: 'This will be the home page after user is logged in'} )
    res.render("settings", { isLoggedIn: req.session.loggedIn }); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

router.get("/about", async (req, res) => {
  try {
    res.render("about"); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

router.get("/contact", async (req, res) => {
  try {
    res.render("contact"); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

router.get("/faq", async (req, res) => {
  try {
    res.render("faq"); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});


router.get("/myrecipes", withAuth, async (req, res) => {
  try {

    const recipeData = await Recipe.findAll({
      where: {
        user_id: req.session.userId,
      },
    });

    const recipes = recipeData.map((recipe) =>
      recipe.get({ plain: true })
    );

    res.render("recipes", {
      recipes,
      isLoggedIn: req.session.loggedIn,
      
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
