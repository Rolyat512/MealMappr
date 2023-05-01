const { Model, DataTypes } = require("sequelize");
const sequelize = require("./config/connection");

class Dish extends Model {}
// ^ change dish to whatever our database is
