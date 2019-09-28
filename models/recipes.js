module.exports = function(sequelize, DataTypes) {
  var Recipes = sequelize.define("Recipes", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    recipeUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  console.log(sequelize)

  Recipes.associate = function (models) {
    models.Recipes.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipes;
};
