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
    fetch('/recipes')
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

  // func to delete a recipe
  const handleDelete = async (id) => {
    try {
      await fetch(`/recipes/${id}`, { method: 'DELETE' });
      setRecipes(recipes.filter(recipe => recipe._id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="recipe-find">
      <input
        type="text"
        placeholder="Enter recipe name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <button id="find-btn" onClick={findRecipe}>Find</button>
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
      <ul className="recipe-list">
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <span>{recipe.name}</span>
            <button onClick={() => handleDelete(recipe._id)}>DELETE</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;

