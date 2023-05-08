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

const getSavedRecipes = async (recipes) => {
  try {
    const response = await fetch("/savedRecipes", {
      method: "GET",
    });
    if (response.status === 200) {
      const recipes = await response.json();
      return recipes;
    } else {
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

const displayRecipes = async () => {
  const recipes = await getSavedRecipes();
  //get handle on container
  $("#saved-recipes").empty();
  //create div for each saved recipe we recieve from the api
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
    $("#saved-recipes").append(recipeDiv);
  });
  //each div should display the same as a searched recipe div
};

$("form").on("submit", searchRecipes);
$("#closeModal").on("click", () => $("#recipe-modal").addClass("hidden"));
