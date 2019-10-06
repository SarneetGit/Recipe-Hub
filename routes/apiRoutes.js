/* eslint-disable no-unused-vars */
var db = require("../models");
// const passport = require("../config/passport");
const passport = require("passport");
const requireSignAuth = passport.authenticate("local", { session: false });
const axois = require("axios");

module.exports = function(app) {
  app.post("/api/users", (req, res) => {
    console.log(req.body);
    db.User.create(req.body)
      .then(user => {
        res.sendStatus(201).send(user);
      })
      .catch(err => {
        res.sendStatus(400).send(err);
      });
  });

  app.post("/api/login", requireSignAuth, (req, res) => {
    console.log(req.user);
    if (req.user) {
      res.sendsendStatus(200);
    } else {
      res.sendsendStatus(400);
    }
  });

  //Don't think I need this anymore
  app.post("/api/testCreates", (req, res) => {
    let obj = req.body;
    var objToSendRecipes = {
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
    db.Recipes.create(objToSendRecipes)
      .then(recipes => {
        let dbRecipeID = recipes.dataValues.id;
        var ingredientsList = [];

        for (let i of obj.extendedIngredients) {
          let iter = {
            RecipeId: dbRecipeID,
            name: i.name,
            image: "https://spoonacular.com/cdn/ingredients_100x100/" + i.image,
            original: i.original
          };
          ingredientsList.push(iter);
        }
        db.Ingredients.bulkCreate(ingredientsList)
          .then(_ingredients => {
            db.Nutrition.create({
              RecipeId: dbRecipeID,
              calories: obj.nutrition.nutrients[0].amount,
              fat: obj.nutrition.nutrients[1].amount,
              carbs: obj.nutrition.nutrients[3].amount,
              protein: obj.nutrition.nutrients[7].amount
            })
              .then(_nutrition => {
                var instructionsList = [];
                for (let i in obj.analyzedInstructions[0].steps) {
                  let instructionsIter = {
                    RecipeId: dbRecipeID,
                    Number: obj.analyzedInstructions[0].steps[i].number,
                    Step: obj.analyzedInstructions[0].steps[i].step
                  };
                  instructionsList.push(instructionsIter);
                  // console.log(
                  //   obj.analyzedInstructions[0].steps[i].number +
                  //     "\n" +
                  //     obj.analyzedInstructions[0].steps[i].step
                  // );
                }
                console.log(instructionsList);
                db.Instructions.bulkCreate(instructionsList)
                  .then(_instructions => {
                    res.sendStatus(201);
                  })
                  .catch(err => {
                    res.sendStatus(400).send(err);
                  });
              })
              .catch(err => {
                res.sendStatus(400).send(err);
              });
          })
          .catch(err => {
            res.sendStatus(400).send(err);
          });
      })
      .catch(err => {
        res.sendStatus(400).send(err);
      });
  });

  //Sends the results of the search call back to the page, user will be prompted with each title
  //(they can select which one meets their interest) and it will be passed to the call below
  //1)User Inputs Search paramters and clicks enter
  //2)Server makes ajax call, and sends back a list of options that matched search
  app.post("/api/search", (req, res) => {
    let search = req.body.search;
    axois
      .get(
        "https://api.spoonacular.com/recipes/search?apiKey=5ced0faa528f4a91a6f2ee1892c4f789&number=5&query=" +
          search
      )
      .then(response => {
        let searchResultNames = [];
        for (let i of response.data.results) {
          let objAppend = { id: i.id, title: i.title };
          searchResultNames.push(objAppend);
        }
        console.log(searchResultNames);
        // res.render("search", { searchResultNames: searchResultNames });
        res.json(searchResultNames);
      });
  });

  //Builds of call above, user selects which recipe they would like to see and pass the ID below
  //1) User clicks one of the options
  //2) Server recieves ID and returns all relevent values required to show (This is our standard data form)
  app.post("/api/searchRecipe/:id", (req, res) => {
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
        res.json({
          recipesObj: recipesObj,
          ingredientsListObj: ingredientsListObj,
          nutritionObj: nutritionObj,
          instructionsListObj: instructionsListObj
        });
        console.log(
          recipesObj,
          ingredientsListObj,
          nutritionObj,
          instructionsListObj
        );
      });
  });

  //If a user decides at any point to save a recipe, we pass the ID to this call and it will write to DB
  //1) User likes a recipe and decides to click save
  app.post("/api/SaveRecipe/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    axois
      .get(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=5ced0faa528f4a91a6f2ee1892c4f789`
      )
      .then(response => {
        console.log("Api call response received.");
        let obj = response.data;
        var objToSendRecipes = {
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
        db.Recipes.create(objToSendRecipes)
          .then(recipes => {
            let dbRecipeID = recipes.dataValues.id;
            var ingredientsList = [];

            for (let i of obj.extendedIngredients) {
              let iter = {
                RecipeId: dbRecipeID,
                name: i.name,
                image:
                  "https://spoonacular.com/cdn/ingredients_100x100/" + i.image,
                original: i.original
              };
              ingredientsList.push(iter);
            }
            db.Ingredients.bulkCreate(ingredientsList)
              .then(_ingredients => {
                db.Nutrition.create({
                  RecipeId: dbRecipeID,
                  calories: obj.nutrition.nutrients[0].amount,
                  fat: obj.nutrition.nutrients[1].amount,
                  carbs: obj.nutrition.nutrients[3].amount,
                  protein: obj.nutrition.nutrients[7].amount
                })
                  .then(_nutrition => {
                    var instructionsList = [];
                    for (let i in obj.analyzedInstructions[0].steps) {
                      let instructionsIter = {
                        RecipeId: dbRecipeID,
                        Number: obj.analyzedInstructions[0].steps[i].number,
                        Step: obj.analyzedInstructions[0].steps[i].step
                      };
                      instructionsList.push(instructionsIter);
                    }
                    console.log(instructionsList);
                    db.Instructions.bulkCreate(instructionsList)
                      .then(_instructions => {
                        res.sendStatus(201);
                      })
                      .catch(err => {
                        res.sendStatus(400).send(err);
                      });
                  })
                  .catch(err => {
                    res.sendStatus(400).send(err);
                  });
              })
              .catch(err => {
                res.sendStatus(400).send(err);
              });
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      });
  });

  // If user clicks saved recipes tab, the page on load will do a get request
  //1) Get all saved recipes (for a given user)
  //2) Server side code will display a recipe card for each
  app.get("/api/saved", function(req, res) {
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
      console.log(recipes);
      res.json(recipes);
    });
  });

  // Delete recipe by ID
  app.delete("/api/examples/:id", function(req, res) {
    db.Recipes.destroy({ where: { id: req.params.id } }).then(function(recipe) {
      res.json(recipe);
    });
  });
};
