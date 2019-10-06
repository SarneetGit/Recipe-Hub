/* eslint-disable indent */
$(window).on("load", function() {
  var obj = {
    recipesObj: {
      title: "Pumpkin, halloumi & chilli omelette",

      servings: 4,

      image: "https://spoonacular.com/recipeImages/218777-556x370.jpg",

      vegetarian: false,

      aggregateLikes: 277,

      spoonacularScore: 74,

      sourceUrl:
        "https://www.bbcgoodfood.com/recipes/1577637/pumpkin-halloumi-and-chilli-omelette",

      readyInMinutes: 40,

      UserId: 1
    },

    ingredientsListObj: [
      {
        RecipeId: "218777",

        name: "rapeseed oil",

        image:
          "https://spoonacular.com/cdn/ingredients_100x100/vegetable-oil.jpg",

        original: "2 tbsp olive or rapeseed oil"
      },

      {
        RecipeId: "218777",

        name: "halloumi cheese",

        image: "https://spoonacular.com/cdn/ingredients_100x100/halloumi.png",

        original: "175g halloumi cheese, sliced"
      },

      {
        RecipeId: "218777",

        name: "butternut squash",

        image:
          "https://spoonacular.com/cdn/ingredients_100x100/butternut-squash.jpg",

        original: "500g pumpkin or butternut squash, diced"
      },

      {
        RecipeId: "218777",

        name: "chillies",

        image: "https://spoonacular.com/cdn/ingredients_100x100/red-chili.jpg",

        original: "2 red chillies, seeded and finely chopped"
      },

      {
        RecipeId: "218777",

        name: "garlic clove",

        image: "https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg",

        original: "1 garlic clove, finely chopped"
      },

      {
        RecipeId: "218777",

        name: "balsamic vinegar",

        image:
          "https://spoonacular.com/cdn/ingredients_100x100/balsamic-vinegar.jpg",

        original: "2 tsp cider or balsamic vinegar"
      },

      {
        RecipeId: "218777",

        name: "mint",

        image: "https://spoonacular.com/cdn/ingredients_100x100/mint.jpg",

        original: "small bunch mint, roughly chopped"
      },

      {
        RecipeId: "218777",

        name: "eggs",

        image: "https://spoonacular.com/cdn/ingredients_100x100/egg.png",

        original: "6 eggs, beaten"
      }
    ],

    nutritionObj: {
      RecipeId: "218777",

      calories: 363.47,

      fat: 24.28,

      carbs: 18.27,

      protein: 19.68
    },

    instructionsListObj: [
      {
        RecipeId: "218777",

        Number: 1,

        Step:
          "Heat half the oil in a large frying pan. Cook the halloumi for 1-2 mins on each side until golden, remove from the pan and set aside."
      },

      {
        RecipeId: "218777",

        Number: 2,

        Step:
          "Add the remaining oil to the pan, then cook the squash for about 10 mins, until soft and starting to colour."
      },

      {
        RecipeId: "218777",

        Number: 3,

        Step: "Add the chilli and garlic and cook for a further 2 mins."
      },

      {
        RecipeId: "218777",

        Number: 4,

        Step:
          "Pour over the vinegar, then put the halloumi back into the pan, scatter over the mint and pour on the eggs. Cook for 5 mins until the base is set."
      },

      {
        RecipeId: "218777",

        Number: 5,

        Step:
          "Heat the grill to high. Flash the omelette under the grill for 5 mins until puffed up and golden."
      },

      {
        RecipeId: "218777",

        Number: 6,

        Step:
          "Serve immediately or allow to cool and serve cold with a salad if you like."
      }
    ]
  };

  function upperCase(str) {
    var splitStr = str.split(" ");

    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(" ");
  }

  $("body").on("click", "#myButton", function() {
    event.preventDefault();

    console.log("Click!");

    for (let i = 0; i < obj.ingredientsListObj.length; i++) {
      let element = obj.ingredientsListObj[i];

      $(".third").append(
        ` <figure class="figure">
  
              <img src="${upperCase(
                element.image
              )}" class="figure-img img-fluid rounded" alt="A generic square placeholder image with rounded corners in a figure.">
  
              <figcaption class="figure-caption text-center">${upperCase(
                element.name
              )}</figcaption>
  
            </figure>`
      );
    }
  });
});
