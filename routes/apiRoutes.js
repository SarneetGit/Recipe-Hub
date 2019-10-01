/* eslint-disable no-unused-vars */
var db = require("../models");
// const passport = require("../config/passport");
const passport = require("passport");
const requireSignAuth = passport.authenticate("local", { session: false });

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

  app.post("/api/testCreates", (req, res) => {
    let obj = req.body;
    // console.log({
    //   title: obj.title,
    //   servings: obj.servings,
    //   image: obj.image,
    //   vegetarian: obj.vegetarian,
    //   glutenFree: obj.glutenFree,
    //   spoonacularScore: obj.spoonacularScore,
    //   sourceUrl: obj.sourceUrl,
    //   readyInMinutes: obj.readyInMinutes,
    //   UserId: 1
    // });
    var objToSendRecipes = {
      title: obj.title,
      servings: obj.servings,
      image: obj.image,
      vegetarian: obj.vegetarian,
      glutenFree: obj.glutenFree,
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

  // Get all examples
  app.get("/api/examples", function(_req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
