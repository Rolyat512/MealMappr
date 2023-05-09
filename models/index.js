const User = require('./user');
const Meal = require('./meal');
const Recipe = require('./recipe');

User.hasMany(Meal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Meal.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Recipe, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Recipe.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Meal, Recipe };
