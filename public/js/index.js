/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
// //NEXT BUTTON
$(document).ready(function() {
  // popovers initialization - on hover
  $('[data-toggle="popover-hover"]').popover({
    html: true,
    trigger: "hover",
    placement: "bottom",
    content: function() {
      return '<img src="' + $(this).data("img") + '" />';
    }
  });

  // popovers initialization - on click
  $('[data-toggle="popover-click"]').popover({
    html: true,
    trigger: "click",
    placement: "bottom",
    content: function() {
      return '<img src="' + $(this).data("img") + '" />';
    }
  });
  $("#div2").hide();
  $("#removeButton").hide();
  //   $("#instructionsTable").hide();
  $("#next").on("click", function() {
    $("#div2").show();
    $("#div1").hide();
  });
  $("#back").on("click", function() {
    $("#div2").hide();
    $("#div1").show();
  });
  $("#add").on("click", function() {
    $("#instructionsTable").show();
  });

  //add ingredfients

  $("#addIngred").on("click", function() {
    let ingredients = $("#original")
      .val()
      .trim();
    $("#ingredientsTable tbody").append(`<tr>
        <td class="ingredients">${ingredients}</td>
        <td><button class='btn btn-danger btn-sm btn-delete'>X</button></td>
    </tr>`);
  });
  $("body").on("click", ".btn-delete", function() {
    $(this)
      .parents("tr")
      .remove();
  });
  //add instructions
  var count = 0;
  $("#add").on("click", function() {
    count++;
    let instruction = $("#instrucStep")
      .val()
      .trim();
    $("#instructionsTable tbody").append(`<tr>
        <th class="countID">${count}</th>
        <td class="instruction">${instruction}</td>
        <td><button class='btn btn-danger btn-sm btn-delete'>X</button></td>
        <
    </tr>`);
  });
  ///Send data to backend from the first form
  $(".next").on("click", function() {
    event.preventDefault();
    let firstForm = {
      title: $("#title")
        .val()
        .trim(),
      vegetarian: $("#vegetarian")
        .val()
        .trim(),
      readyInMinutes: $("#prepTime")
        .val()
        .trim(),
      servings: $("#servings")
        .val()
        .trim(),
      original: $("#addIngred")
        .val()
        .trim()
    };
    console.log(firstForm);
  });
  ///Send data to backend from the 2nd form
  $("#sumbitRecipe").on("click", function() {
    event.preventDefault();
    let secondForm = {
      step: $("#instrucStep")
        .val()
        .trim()
    };
    console.log(secondForm);
  });

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
            <a href="${recipe.sourceUrl}" target="_blank"></a>
            <i class="far fa-heart float-right save" data-id=${id} data-state="notSaved" style="color:red;"></i>
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
    $(this).attr("class", "fas fa-heart float-right save");
    if ($(this).data("state") === "notSaved") {
      $.ajax("/api/SaveRecipe/" + id, {
        type: "POST"
      }).then(function(resp) {
        $(".save").data("state", "saved");
        return true;
      });
    } else {
      return true;
    }
  });
  //   $("body").on("click", ".seeRecipe", function(_event) {
  //     var id = $(this).data("id");
  //     $.ajax("/api/show/" + id, {
  //       type: "GET"
  //     }).then(function(resp) {
  //       return true;
  //     });
  //   });
});