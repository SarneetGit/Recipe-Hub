// //NEXT BUTTON
$(document).ready(function() {
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
