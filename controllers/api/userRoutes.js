const router = require("express").Router();
const { User, Meal } = require("../../models");
const bcrypt = require("bcrypt");
const withAuth = require("../../utils/auth");

// this is the route for the user when clicking the signup button
// route: users/signup
router.get("/signup", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const user = await User.findByPk(req.session.userId);
      if (user) {
        res.redirect("/home");
        return;
      }
    }
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
      req.session.userId = dbUserData.id; // to get the user.id for the session, so i can use it for update and delete functions
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
    if (req.session.loggedIn) {
      res.redirect("/home");
      return;
    }
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
      req.session.userId = dbUserData.id; // gets the user ID at login // confirmed working
      req.session.loggedIn = true;

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

router.get("/settings", withAuth, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.session.userId },
      raw: true,
      nest: true,
    });
    res.render("settings", {
      loggedIn: true,
      user,
    });
  } catch (err) {
    res.status(400).json({ message: "No page found" });
    console.log(err);
  }
});

router.put("/settings", withAuth, async (req, res) => {
  try {
    const updateUser = await User.update(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // id: req.session.user_id
      },
      { where: { id: req.session.userId }, individualHooks: true }
    );
    if (!updateUser) {
      res.status(404).json({ message: "No user found" });
      return;
    }
    res.status(200).json({ message: "User info has been updated" });
  } catch (err) {
    res.status(500).json({ message: "An error has occured" });
    console.log(err);
  }
});

router.delete("/settings", withAuth, async (req, res) => {
  try {
    const deleteAccount = await User.destroy({
      where: { id: req.session.userId },
    });
    if (!deleteAccount) {
      res.status(404).json({ message: "No user with this ID found" });
      return;
    }
    res.status(200).json({ message: "Account  has been deleted" });
  } catch (err) {
    res.status(500).json({ message: "An error has occured" });
    console.log(err);
  }
});

module.exports = router;
