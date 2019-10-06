/* eslint-disable no-unused-vars */
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$("document").ready(function() {
  console.log("Loaded");
  $("#submitBtn").on("click", function(_event) {
    event.preventDefault();
    var searchCriteria = {
      search: $("#search")
        .val()
        .trim()
    };
    if (searchCriteria.search === "") {
      alertify
        .alert()
        .set("message", "Please enter a valid Recipe to search for.")
        .setHeader("Someone can't follow simple instructions . . .")
        .show();
    } else {
      // Send the POST request.
      $.ajax("/api/search", {
        type: "POST",
        data: searchCriteria
      }).then(function(resp) {
        $("#search").val("");
        // console.log("New Burger Created");
        // Reload the page to get the updated list
        console.log(resp);
        $("#resultsCard").removeClass("d-none");
        for (let i of resp) {
          console.log(i.id, i.title);
          $("#searchResultAppend").append(`
            <li class="list-group-item d-flex justify-content-between align-items-center recipeOption" data-id="${i.id}">
            ${i.title}
            </li>
            `);
        }
      });
    }
  });

  $("body").on("click", ".recipeOption", function(_event) {
    console.log("recipe name was clicked");
    $("#resultsCard").addClass("d-none");
    var id = $(this).data("id");
    console.log(id);
    // Send the POST request.
    $.ajax("/api/searchRecipe/" + id, {
      type: "POST"
    }).then(function(resp) {
      console.log(resp);
      let recipe = resp.recipesObj;
      let nutrition = resp.nutritionObj;
      let instructions = resp.instructionsListObj;
      let ingredients = resp.ingredientsListObj;
      let isVegetarian = "d-none";
      if (recipe.vegetarian) {
        isVegetarian = "";
      }
      console.log(recipe.title);
      $(".container").append(`
    <div class="row" style="margin-bottom:10vh;">
      <div class="col-lg-4 offset-4">
        <div class="card">
          <div class="view">
            <img src="${recipe.image}" class="card-img-top" alt="photo">
            <a href="${recipe.sourceUrl}" target="_blank">
            </a>
          </div>
          <div class="card-body">
            <h4 class="card-title" style="color:black;">${recipe.title}</h4>
            <small class="text-muted cat">
              <i class="far fa-clock text-info"></i> ${recipe.readyInMinutes} minutes
              <i class="fas fa-users text-info"></i> ${recipe.servings} portions
            </small>
            <p class="card-text text-center">  Calories:${nutrition.calories} | Carbohydrates:${nutrition.carbs}    Fats:${nutrition.fat} | Protein:${nutrition.protein}</p>
            <span>
                <a href="#" class="btn btn-info btn-md float-left">Instructions</a>
                <a href="#" class="btn btn-info btn-md float-right">Ingredients</a>
            </span>
          </div>
          <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
            <div class="views">  
            </div>
            <div class="stats">
              <span class=""><i class="far fa-thumbs-up"></i> ${recipe.aggregateLikes}</span>
              <span class="${isVegetarian}"><i class="fas fa-leaf"></i> Vegeterian</span>
            </div>
          </div>
        </div>
      </div>      
  </div>`);
    });
  });

  $("body").on("click", ".save", function(_event) {
    var id = $(this).data("id");
    $.ajax("/api/SaveRecipe/" + id, {
      type: "POST"
    }).then(function(resp) {
      return true;
    });
  });
  //   $("body").on("click", ".recipeOption", function(event) {
  //     // Make sure to preventDefault on a submit event.
  //     // event.preventDefault();
  //     console.log("Submission Clicked");

  //     var newBurger = {
  //       name: $("#bughaName")
  //         .val()
  //         .trim()
  //     };

  //     if (newBurger.name === "") {
  //       alertify
  //         .alert()
  //         .set("message", "Please enter a valid burger name.")
  //         .setHeader("Invalid Burger Name!")
  //         .show();
  //     } else {
  //       // Send the POST request.
  //       $.ajax("/api/burgers", {
  //         type: "POST",
  //         data: newBurger
  //       }).then(function() {
  //         console.log("New Burger Created");
  //         // Reload the page to get the updated list
  //         location.reload();
  //       });
  //     }
  //   });
  //   // Send the PUT request.
  //   $.ajax("/api/burgers/", {
  //     type: "PUT",
  //     data: consumedBurger
  //   }).then(function() {
  //     console.log("Burger has been successfully devoured.");
  //     // Reload the page to get the updated list
  //     location.reload();
  //   });
});
