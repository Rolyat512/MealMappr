const User = require('./user');
const Meal = require('./meal');

User.hasMany(Meal,{
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

Meal.belongsTo(User,{
foreignKey: 'user_id'
});

module.exports = {User, Project };