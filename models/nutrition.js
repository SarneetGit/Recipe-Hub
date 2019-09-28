module.exports = function(sequelize, DataTypes) {
    var Nutrition = sequelize.define("Nutrition", {
      calories: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      carbs: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      fats: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      protein: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }      
    });
  
    Nutrition.associate = function (models) {
      models.Nutrition.belongsTo(models.Recipes, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Nutrition;
  };
  