// const sequelize = require("../config/connection");
// const { Meal } = require("../models");

// const mealData = require("./mealData.json");

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await Meal.bulkCreate(mealData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// seedDatabase();
