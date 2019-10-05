// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// Make sure we wait to attach our handlers until the DOM is fully loaded.

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

//testing the instructions
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }
// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";
//   };
// }
// let tempTask = [];
// let todo = document.getElementById("todo");
// // Create a new list item when clicking on the "Add" button
// function newElement() {
//   let inputValue = document.getElementById("myInput").value;
//   let numb = document.getElementById("numb").value;
//   //   console.log(inputValue, numb);
//   tempTask.push({ number: numb, step: inputValue });
//   //   todo.remove();
//   tempTask.forEach(value => {
//     console.log(value);
//     todo.innerHTML += value.taskID + " - " + value.inputText + "<br/>";
//   });
//   console.log(tempTask);
//   //   var sendSarneet = [];
//   sendSarneet.push({number})
//   var ol = document.createElement("ol");
//   var inputValue = document.getElementById("myInput").value;
//   var input = document.createTextNode(inputValue);
//   ol.appendChild(t);
//   if (inputValue === "") {
//     alert("Please add instruction!");
//   } else {
//     document.getElementById("myUL").appendChild(ol);
//   }
//   document.getElementById("myInput").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     };
//   }
// }
//TESTING FIRST FORM SUBMISSION
// $("#next").on("click", function() {
//   event.preventDefault();
//   let firstForm = {
//     title: $("#title")
//       .val()
//       .trim(),
//     servings: $("#servings")
//       .val()
//       .trim(),
//     image: $("#img")
//       .val()
//       .trim(),
//     vegetarian: $("#servings")
//       .val()
//       .trim()
//   };
//   console.log(firstForm);
// });
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
// function add() {
//   var instruction = document.getElementById("myInput").value;
//   document.getElementById("myInput").innerHTML = instruction;
// }
//add ingredfients

$("#addIngred").on("click", function() {
  let ingredients = $("#ingredients")
    .val()
    .trim();
  $("#ingredientsTable tbody").append(`<tr>
    <td class="ingredients">${ingredients}</td>
  </tr>`);
});

//add instructions
var count = 0;
$("#add").on("click", function() {
  count++;
  let instruction = $("#instructions")
    .val()
    .trim();
  $("#instructionsTable tbody").append(`<tr>
    <th class="countID">${count}</th>
    <td class="instruction">${instruction}</td>
  </tr>`);
});
