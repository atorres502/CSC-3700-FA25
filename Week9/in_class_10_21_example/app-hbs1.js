const express = require('express');
const { engine } = require('express-handlebars');
const app = express();

// Setup Handlebars with .hbs extension
app.engine('hbs', engine({
  defaultLayout: false,
  extname: '.hbs'
}));
app.set('views engine', 'hbs');
app.set('views', './views');

// Route that passes data to views
app.get('/', (req, res) => {
  res.render('home', {
    username: 'Sarah',
    isPremium: true,
    hobbies: ['Reading', 'Gaming', 'Hiking', 'Cooking']
  });
});
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});