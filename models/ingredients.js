module.exports = function(sequelize, DataTypes) {
  var Ingredients = sequelize.define("Ingredients", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    ingredienteUrl: {
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
