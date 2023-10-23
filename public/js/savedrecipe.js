const pathArray = window.location.pathname.split("/"); // Output will be ["", "user", "listing", "2"]

// Find the index of 'myrecipes' and get the next item
const index = pathArray.indexOf("myrecipes");
const number = pathArray[index + 1]; // Should be '2' if it exists

// Check if 'number' exists before proceeding
if (number) {
  const deleteRecipe = async (recipeNumber) => {
    try {
      const response = await fetch(`/users/myrecipes/${recipeNumber}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Recipe deleted successfully");
        // Optional: const data = await response.json();
      } else {
        console.log("Failed to delete recipe");
      }
    } catch (err) {
      console.log("An error occurred:", err);
    }
  };

  const deleteButton = $("#delete-recipe");

  deleteButton.on("click", () => {
    deleteRecipe(number); // Pass the 'number' to 'deleteRecipe'
  });
} else {
  console.log("Recipe number not found in URL");
}
