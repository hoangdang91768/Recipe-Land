import React, { useState, useEffect } from 'react';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [foundRecipe, setFoundRecipe] = useState(null);

  // fetch recipes when the component is loaded
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    fetch('/api/recipes')
      .then((res) => res.json())
      .then((recipes) => setRecipes(recipes));
  };

  // func to find and display a recipe
  const findRecipe = () => {
    const recipeToFind = recipes.find((recipe) => recipe.name === searchName);
    if (recipeToFind) {
      setFoundRecipe(recipeToFind);
    } else {
      setFoundRecipe(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter recipe name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button onClick={findRecipe}>Find</button>
      {foundRecipe ? (
        <div>
          <h2>Found Recipe:</h2>
          <p>Name: {foundRecipe.name}</p>
          <p>Ingredients: {foundRecipe.ingredients}</p>
          <p>Instructions: {foundRecipe.instructions}</p>
        </div>
      ) : (
        <p>No recipe found.</p>
      )}

      {/* show recipe name on the main page */}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>{recipe.name}</li>
        ))}
      </ul>

    </div>
  );
};

export default RecipeList;

