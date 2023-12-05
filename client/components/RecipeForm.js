import React, { useState } from 'react';

const RecipeForm = () => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch('/api/recipes', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, 
          ingredients,
          instructions
        })   
      });
      
      if (!resp.ok) {
        throw new Error('Failed to create recipe');
      }

      window.location.reload();
      
    } catch (err) {
      console.error(err); 
    }
  }
  
  // console.log('Sending JSON:', JSON.stringify({ name, ingredients, instructions }));

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        placeholder="Recipe name"
        value={name}
        onChange={e => setName(e.target.value)}  
      />

      <textarea
        placeholder="Ingredients (separated by commas)"
        value={ingredients}
        onChange={e => setIngredients(e.target.value)}  
      />

      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
      />

      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default RecipeForm;