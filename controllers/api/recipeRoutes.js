//GET saved recipes route
router.get("/myrecipes", async (req, res) => {
    try {
      // Find all recipes in the database
      const recipes = await Recipe.findAll();
      res.status(200).json(recipes);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving meals" });
    }
  });