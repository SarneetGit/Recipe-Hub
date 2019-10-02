/* eslint-disable no-unused-vars */
// Make sure we wait to attach our handlers until the DOM is fully loaded.
$("document").ready(function() {
  console.log("Loaded");
  $("#search").on("click", function(_event) {
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
        // console.log("New Burger Created");
        // Reload the page to get the updated list
        console.log(resp);
        location.reload();
      });
    }
  });

  $("#createBugha").on("click", function(event) {
    // Make sure to preventDefault on a submit event.
    // event.preventDefault();
    console.log("Submission Clicked");

    var newBurger = {
      name: $("#bughaName")
        .val()
        .trim()
    };

    if (newBurger.name === "") {
      alertify
        .alert()
        .set("message", "Please enter a valid burger name.")
        .setHeader("Invalid Burger Name!")
        .show();
    } else {
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(function() {
        console.log("New Burger Created");
        // Reload the page to get the updated list
        location.reload();
      });
    }
  });
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
