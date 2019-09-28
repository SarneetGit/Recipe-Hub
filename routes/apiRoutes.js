var db = require("../models");

module.exports = function(app) {
  // Get all user information
  app.get("/api/users", function(req, res) {
    // Remember to change the table name
    db.users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
  // Find specific user information
  app.get("/api/users/:username", function(req, res) {
    db.users
      .findOne({
        where: {
          username: req.params.username
        }
      })
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });
  // Add user
  app.post("/api/users", function(req, res) {
    db.users.create(req.body).then(user=>{
      res.status(201).send(user);
    }).catch(err=>{
      res.status(400).send(err);
    })
  });
  // Delete the user information
  app.delete("api/users/:username", function(req, res) {
    db.users
      .destroy({ where: { username: req.params.username } })
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  });

  app.get("/api/recipes", function(req, res) {
    db.recipes.findAll({}).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  app.get("/api/recipes/:recipes", function(req, res) {
    db.recipes
      .findOne({
        where: {
          recipes: req.params.recipes
        }
      })
      .then(function(dbRecipes) {
        res.json(dbRecipes);
      });
  });
  // Add recipes
  app.post("/api/recipes", function(req, res) {
    db.recipes.create(req.body).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });
  // Delete the user information
  app.delete("api/recipes/:recipes", function(req, res) {
    db.recipes
      .destroy({ where: { recipes: req.params.recipes } })
      .then(function(dbRecipes) {
        res.json(dbRecipes);
      });
  });

  
};
