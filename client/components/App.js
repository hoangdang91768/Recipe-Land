import React from 'react';
import '../styles.scss';
import RecipeForm from './RecipeForm';
import RecipeList from './RecipeList';

const App = () => {
  return (
    <div className="app-container">
      <h2>Create Your Personal Recipe Wonderland !!!</h2>
      <RecipeForm />
      <RecipeList />
    </div>
  );
};

export default App;





