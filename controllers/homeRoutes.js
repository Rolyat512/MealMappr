const router = require("express").Router();
const { User, Recipe, Meal } = require("../models");
require("dotenv").config();

const nodemailer = require("nodemailer");

// Configure Nodemailer
const transport = nodemailer.createTransport({
  service: "hotmail", // You can use other email services like Yahoo, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
      //include: [{ model: Meal }],
    });
    const user = await userData.get({ plain: true });

    res.render("homepage", { ...user, loggedIn: true }); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});


router.get("/settings", withAuth, async (req, res) => {
  try {
    //res.json({message: 'This will be the home page after user is logged in'} )
    res.render("settings", { loggedIn: true }); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

router.get("/about", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render("about", { loggedIn: true });
    } else {
      res.render("about"); //this will be for redner the home handlebars layout
    }
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

router.get("/contact", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render("contact", { loggedIn: true }); //this will be for redner the home handlebars layout
    } else {
      res.render("contact"); //this will be for redner the home handlebars layout
    }
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

router.get("/faq", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.render("faq", { loggedIn: true }); //this will be for redner the home handlebars layout
    } else {
      res.render("faq"); //this will be for redner the home handlebars layout
    }
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

    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

    res.render("recipes", {
      recipes,
      loggedIn: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Compose the email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Replace this with the email you want to receive the message
      subject: "Review: Someone submitted the MealMappr Contact Form!",
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    const emailSent = await transport.sendMail(mailOptions);

    if (emailSent) {
      res.status(200).redirect("/");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while sending the email.");
  }
});

module.exports = router;
