const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config/connection');

class Meal extends Model {}

Meal.init(
    {
    foodTitle: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
    },
    itemDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0,150] 
        }
    },
    proteinValue: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Calories: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Carbs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Categories: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
          },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'meal',
    }
)

module.exports = Meal;