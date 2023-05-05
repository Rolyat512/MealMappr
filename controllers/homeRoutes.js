const router = require("express").Router();
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
    //res.json({message: 'This will be the home page after user is logged in'} )
    res.render("homepage", { isLoggedIn: req.session.loggedIn }); //this will be for redner the home handlebars layout
  } catch (err) {
    res.status(400).json({ message: "No homepage found" });
    console.log(err);
  }
});

// when user clicks the acount settings button
// router.get('/home/settings', withAuth, async (req, res) => {
//     try {
//           res.json({message: 'This will be the settings page after user is logged in and clicks the account settings tab to update or delete account info'} )
//         //res.render('settings', {isLoggedIn:req.session.loggedIn}) this will be for redner the account settings handlebars layout
//     } catch (err) {
//         res.status(400).json({message: 'No page found'});
//         console.log(err)
//     }
// });

// updates a user password // double check the route  will come back to this
// router.put('/home/settings/:id', withAuth, async (req, res) => {
//     try {
//         const updatePW = await User.update( // calling the User table
//         { password: req.body.password },// calling column "password" and update with whatever is in the body req
//         { where: {password: req.params.id} } // where the column "password" is equal to the req.params.id
//         );
//         if(!updatePW) {
//         res.status(404).json({message: 'No user with this ID found'});
//         return;
//         }
//         res.status(200).json({message:"upated successful"})
//     } catch (err) {
//         res.status(500).json({message:"An error has occured"});
//         console.log(err);
//     }

// });

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
