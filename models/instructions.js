module.exports = function(sequelize, DataTypes) {
  var Instructions = sequelize.define("Instructions", {
    Number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    Step: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 0
    }
  });
  Instructions.associate = function(models) {
    models.Instructions.belongsTo(models.Recipes, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Instructions;
};
