const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));
} else {
  app.use(express.static(path.resolve(__dirname, '../client')));
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost/recipe-book', { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

// Recipe model
const recipesSchema = new Schema(
  {
    name: String,
    ingredients: String,
    instructions: String
  }
);

const Recipe = mongoose.model('Recipe', recipesSchema, 'recipes');

// GET
app.get('/api/recipes', async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

// ADD
app.post('/api/recipes', async (req, res) => {
    // console.log('Received JSON:', req.body);
    try {
      console.log('POST /api/recipes', req.body);
      const newRecipe = new Recipe(req.body);
      const savedRecipe = await newRecipe.save();
      console.log('SavedRecipe', savedRecipe);
      // Recipe.create(savedRecipe);
      res.status(201).end(); 
    } catch (error) {
      console.error('Error processing JSON:', error);
      res.status(400).json({ error: 'Invalid JSON data' });
    }
});

// DELETE 
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).send('Recipe deleted');
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use((req, res) => res.status(404).send('This is not a page!'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});