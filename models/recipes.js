module.exports = function(sequelize, DataTypes) {
  var Recipes = sequelize.define("Recipes", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        len: [1]
      }
    },
    vegetarian: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    aggregateLikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    spoonacularScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    sourceUrl: {
      type: DataTypes.STRING,
      defaultValue: "Not Available"
    },
    readyInMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    apiId: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  Recipes.associate = function(models) {
    models.Recipes.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipes;
};
