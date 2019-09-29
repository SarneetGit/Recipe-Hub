var db = require("../models");

module.exports = function(app) {
  // Get all user information
  app.get("/api/User", function(req, res) {
    // Remember to change the table name
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // Find specific user information
  app.get("/api/User/:username", function(req, res) {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // Add user
  // app.post("/api/User", function(req, res) {
  //   db.User.create(req.body)
  //     .then(function(user) {
  //       res.status(201).send(user);
  //     })
  //     .catch(function(err) {
  //       res.status(400).send(err);
  //     });
  // });
  // Delete the user information
  app.delete("api/User/:username", function(req, res) {
    db.User.destroy({ where: { username: req.params.username } }).then(function(
      dbUser
    ) {
      res.json(dbUser);
    });
  });

  app.get("/api/User/Recipes/:username", function(req, res) {
    db.Recipes.findAll({}, { include: [req.params.username] }).then(function(
      dbRecipes
    ) {
      res.json(dbRecipes);
    });
  });

  app.get("/api/:username/:Recipes", function(req, res) {
    db.Recipes.findOne(
      {
        where: {
          Recipes: req.params.Recipes
        }
      },
      { include: [req.params.username] }
    ).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });
  // Add Recipes
  app.post("/api/Recipes", function(req, res) {
    db.Recipes.create(req.body).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });
  // Delete the user information
  app.delete("api/:username/:Recipes", function(req, res) {
    db.Recipes.destroy(
      { where: { Recipes: req.params.Recipes } },
      { include: [req.params.username] }
    ).then(function(dbRecipes) {
      res.json(dbRecipes);
    });
  });

  app.post("/api/Ingredients", function(req, res) {
    db.Ingredients.create(req.body)
      .then(function(ingredients) {
        res.status(201).send(ingredients);
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  });

  app.post("/api/Nutrition", function(req, res) {
    db.Nutrition.create(req.body)
      .then(function(nutrition) {
        res.status(201).send(nutrition);
      })
      .catch(function(err) {
        res.status(400).send(err);
      });
  });
};
