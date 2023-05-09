const router = require("express").Router();
const { Meal, User } = require("../models");
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

// for a user to delete their account, will need to come back to update this, once more info is done -kd
// router.delete('/home/settings/:id', withAuth, async (req, res) => {
// try {
//     const deleteUser = await User.destroy();

//     if(!deleteUser) {
//     res.status(404).json({message: 'No user with this ID found'});
//     return;
//     }
//     res.status(200).json({message: 'This user has been successfully deleted'})
// } catch (err) {
//     res.status(500).json({message:"An error has occured"});
//     console.log(err);
// };
// });

module.exports = router;
