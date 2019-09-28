var path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // cms route loads cms.html
  app.get("/myRecipes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/myRecipes.html"));
  });

  // blog route loads blog.html
  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/search.html"));
  });
};
