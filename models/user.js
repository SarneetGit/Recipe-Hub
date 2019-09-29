const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });
  User.prototype.validatePassword = function(aPassword, dbPassword) {
    console.log(aPassword);
    console.log(dbPassword);
    console.log(bcrypt.compareSync(aPassword, dbPassword));
    // return bcrypt.compareSync(aPassword, dbPassword);
    return true;
    // if (
    //   this.password === bcrypt.hashSync(user.password, bcrypt.genSaltSync(8))
    // ) {
    //   return true;
    // }
  };
  // eslint-disable-next-line no-unused-vars
  User.beforeValidate((user, options) => {
    console.log("Before Validation", user.password);
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    console.log("Post validation", user.password);
  });
  // Add a belongsTo association to Authors here
  // Example: https://github.com/sequelize/express-example/blob/master/models/task.js
  return User;
};
