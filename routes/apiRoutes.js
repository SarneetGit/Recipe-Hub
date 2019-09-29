var db = require("../models");
// const passport = require("../config/passport");
const passport = require("passport");
const requireSignAuth = passport.authenticate("local", { session: false });

module.exports = function(app) {
  app.post("/api/users", (req, res) => {
    console.log(req.body);
    db.User.create(req.body)
      .then(user => {
        res.status(201).send(user);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  app.post("/api/login", requireSignAuth, (req, res) => {
    console.log(req.user);
    if (req.user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  });
  // Get all examples
  app.get("/api/examples", function(req, res) {
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
