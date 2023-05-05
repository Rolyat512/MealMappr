const router = require("express").Router();
const { Meal } = require("../../models");

// POST a meal route
router.post("/api/meals", async (req, res) => {
    try {
      const dbMeals = await Meal.create(req.body);
  
      res.status(200).json(dbMeals);
  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  //GET meals route
router.get('/meals', async (req, res) => {
    try {
      const meals = await Meal.find({});
      res.status(200).json(meals);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving meals' });
    }
  });
  
  


// router.post("/home", async (req, res) => {
// try {
//     const dbMeals = await Meal.create(req.body);

//     res.status(200).json(dbMeals);

// } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
// }
// });


// router.put('/home/:id', withAuth, async (req, res) => {
//     try {
//         const updatePW = await User.update( // calling the User table
//             { password: req.body.password },// calling column "password" and update with whatever is in the body req
//             { where: {password: req.params.id} } // where the column "password" is equal to the req.params.id
//         );
//         if(!updatePW) {
//             res.status(404).json({message: 'No user with this ID found'});
//             return;
//         }
//             res.status(200).json({message:"upated successful"})
//     } catch (err) {
//         res.status(500).json({message:"An error has occured"});
//         console.log(err);
//     }

// });




module.exports = router;