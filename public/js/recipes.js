const call3rdPtyApi = async (query) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0aee9a94d4mshb908c01c8187bd5p105898jsn5186d0a850dc",
      "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
    },
  };
  const response = await fetch(
    `https://edamam-recipe-search.p.rapidapi.com/search?q=${query}`,
    options
  );
  const data = await response.json();
  console.log(data.hits);
  return data.hits;
};

const displayRecipeModal = (recipe) => {
  $("#recipe-title").text(recipe.label);

  $("#recipe-image").attr("src", recipe.image);
  $("#diet-labels").text(recipe.dietLabels.join(", "));
  $("#health-labels").text(recipe.healthLabels.join(", "));
  $("#cautions").text(recipe.cautions.join(", "));
  const ingredientLines = recipe.ingredientLines.map(
    (ingredient) => `${ingredient}`
  );
  $("#ingredient-list").html(ingredientLines.join("<br>"));
  $("#calories").text(Math.round(recipe.calories));
  $("#cuisine-type").text(recipe.cuisineType);
  $("#meal-type").text(recipe.mealType);
  const macrosList = recipe.digest.map(
    (macro) => `<strong>${macro.label}:</strong> ${Math.round(macro.total)}`
  );
  $("#macros").html(macrosList.join("<br>"));

  $("#recipe-modal").removeClass("hidden");
};

const searchRecipes = async (event) => {
  event.preventDefault();
  try {
    const query = $("#search-bar").val();
    if (!query) {
      alert("Please enter a keyword to search");
    } else {
      $("#recipe-results").html("Loading...");

      const recipes = await call3rdPtyApi(query);

      $("#recipe-results").empty();
      recipes.forEach((recipe) => {
        const recipeDiv = $("<div>").addClass(
          "cursor-pointer p-5 bg-blue-500 flex justify-center items-center hover:bg-blue-700 text-white rounded shadow-md"
        );
        const labelDiv = $("<div>").html(recipe.recipe.label).addClass("mr-4");
        const image = $("<img>")
          .attr({
            src: recipe.recipe.image,
            alt: recipe.recipe.label,
          })
          .addClass("h-16 w-16 object-contain rounded");
        recipeDiv.append(labelDiv, image);
        recipeDiv.on("click", () => displayRecipeModal(recipe.recipe));
        $("#recipe-results").append(recipeDiv);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

$("form").on("submit", searchRecipes);
$("#closeModal").on("click", () => $("#recipe-modal").addClass("hidden"));

$("#save-recipe").on("click", async () => {
  //validate recipe data

  try {
    //Collect recipe data
    const newRecipe = {
      label: $("#recipe-title").text(),
      image: $("#recipe-image").attr("src"),
      dietLabels: $("#diet-labels").text(), // Fixed the typo here
      healthLabels: $("#health-labels").text(), // Fixed the typo here

      cautions: $("#cautions").text(),
      ingredients: $("#ingredient-list").html(),
      calories: Math.round(parseInt($("#calories").text(), 10)),
      cuisineType: $("#cuisine-type").text(),
      mealType: $("#meal-type").text(),
      macros: $("#macros").html(),
      //user_id: userId,
    };

    console.log(newRecipe);

    //TODO:validate recipe data

    //send post request with recipe data
    const response = await fetch("/users/myrecipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });
    // If the meal was successfully added, the new event is added to the calendar and the modal is closed
    if (response.ok) {
      const savedRecipe = await response.json();
      console.log(savedRecipe);
      console.log("Youre recipe was SAVED!");
      $("#recipe-modal").addClass("hidden");
      window.location.reload();
    } else {
      throw new Error("Failed to save recipe");
    }
  } catch (error) {
    console.error("Error saving recipe:", error);
  }

  // Call the displaySavedRecipes function outside of the if statement
  //displaySavedRecipes();
});

const savedRecipeDivs = $(".saved-recipe-div");

savedRecipeDivs.each((index, div) => {
  $(div).on("click", (event) => {
    displaySavedRecipe(event.currentTarget);
  });
});

const displaySavedRecipe = (clickedDiv) => {
  //TODO: call GET route for recipe based on recipe ID
  try {
    const id = clickedDiv.id;
    window.location.href = `/users/myrecipes/${id}`;
  } catch (err) {
    console.log(err);
  }
};
