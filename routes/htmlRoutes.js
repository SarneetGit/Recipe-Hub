var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(toBeDefinedLater) {
      res.render("index", {
        msg: "Welcome!",
        examples: [{ id: 1, text: "test" }, { id: 2, text: "test2" }],
        tbd: toBeDefinedLater
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/search", function(req, res) {
    res.render("search", { name: "Benjamin" });
    // db.Example.findOne({ where: { id: req.params.id } }).then(function(
    //   dbExample
    // ) {
    //   res.render("example", {
    //     example: dbExample
    //   });
    // });
  });
  app.get("/test", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });
  app.get("/wajiha", function(req, res) {
    res.render("create");
  });
  app.get("/savedRecipes", function(req, res) {
    console.log("Url was hit.");
    // db.Recipes.findAll({
    //   // include: [{ model: db.Nutrition, required: true }]
    // }).then(function(recipes) {
    //   console.log(recipes);
    //   res.json(recipes);
    // });
    // db.Nutrition.findAll({
    //   // include: [{ model: db.Nutrition, required: true }]
    // }).then(function(recipes) {
    //   console.log(recipes);
    //   res.json(recipes);
    // });
    db.Nutrition.findAll({
      include: [{ model: db.Recipes, required: true }]
    }).then(function(recipes) {
      console.log(JSON.stringify(recipes));
      res.render("recipes", {
        recipes: recipes,
        name: "benjamin"
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
