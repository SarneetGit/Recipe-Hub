var db = require("../models");
const axois = require("axios");

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
    res.render("search");
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
  app.get("/create", function(req, res) {
    res.render("create");
  });
  app.get("/savedRecipes", function(req, res) {
    console.log("Url was hit.");
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
  app.get("/show/:id", function(req, res) {
    let id = req.params.id;
    axois
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=5ced0faa528f4a91a6f2ee1892c4f789`
      )
      .then(response => {
        let obj = response.data;
        var ingredientsListObj = [];
        var instructionsListObj = [];
        var recipesObj = {
          title: obj.title,
          servings: obj.servings,
          image: obj.image,
          vegetarian: obj.vegetarian,
          aggregateLikes: obj.aggregateLikes,
          spoonacularScore: obj.spoonacularScore,
          sourceUrl: obj.sourceUrl,
          readyInMinutes: obj.readyInMinutes,
          UserId: 1
        };
        for (let i of obj.extendedIngredients) {
          let iter = {
            RecipeId: id,
            name: i.name,
            image: "https://spoonacular.com/cdn/ingredients_100x100/" + i.image,
            original: i.original
          };
          ingredientsListObj.push(iter);
        }
        let nutritionObj = {
          RecipeId: id,
          calories: obj.nutrition.nutrients[0].amount,
          fat: obj.nutrition.nutrients[1].amount,
          carbs: obj.nutrition.nutrients[3].amount,
          protein: obj.nutrition.nutrients[7].amount
        };
        for (let i in obj.analyzedInstructions[0].steps) {
          let instructionsIter = {
            RecipeId: id,
            Number: obj.analyzedInstructions[0].steps[i].number,
            Step: obj.analyzedInstructions[0].steps[i].step
          };
          instructionsListObj.push(instructionsIter);
        }
        res.render("show", {
          recipesObj: recipesObj,
          ingredientsListObj: ingredientsListObj,
          nutritionObj: nutritionObj,
          instructionsListObj: instructionsListObj
        });
      });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
