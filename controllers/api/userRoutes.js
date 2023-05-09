const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");

// this is the route for the user when clicking the signup button
// route: users/signup
router.get("/signup", async (req, res) => {
  try {
    // why is the password showing in url -kd will look into just note for myself
    //res.json({message: 'This will be the signup page'} )
    res.render("signup"); //this will be for redner the welcome handlebars layout when the site first loads
  } catch (err) {
    res.status(400).json({ message: "No page found" });
    console.log(err);
  }
});
// THEN this route will be for the sign up
// route: users/signup
router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// when the user clicks the sign in button, it will bring them to this login page
// route: users/login
router.get("/login", async (req, res) => {
  try {
    //res.json({message: 'This will be the login page'} )
    res.render("login"); //this will be for redner the welcome handlebars layout when the site first loads
  } catch (err) {
    res.status(400).json({ message: "No login page found" });
    console.log(err);
  }
});
// THEN this route checks to see if there is a matching user when clicking login
// route: users/login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Email or Password is incorrect, please try again." });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id; // Set the user_id in the session
      console.log("Session updated:", req.session); // Add this line to log the user_id

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
