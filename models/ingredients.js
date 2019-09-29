module.exports = function(sequelize, DataTypes) {
  var Ingredients = sequelize.define("Ingredients", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:
        "https://cdn3.iconfinder.com/data/icons/random-4/96/food-vegetables-groceries-cook-shopping-bag-512.png"
    },
    original: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  Ingredients.associate = function(models) {
    models.Ingredients.belongsTo(models.Recipes, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Ingredients;
};
