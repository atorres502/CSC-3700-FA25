const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

// Use Handlebars with .hbs files
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (optional CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Sample data
const books = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', checkedOut: true },
    { title: '1984', author: 'George Orwell', checkedOut: false },
    { title: 'Dune', author: 'Frank Herbert', checkedOut: true },
    { title: 'Pride and Prejudice', author: 'Jane Austen', checkedOut: false }
];

// Home route – shows each book
app.get('/', (req, res) => {
    res.render('home', { books });
});

// Summary route – counts books
app.get('/summary', (req, res) => {
    const total = books.length;
    const checkedOutCount = books.filter(b => b.checkedOut).length;
    const availableCount = total - checkedOutCount;

    res.render('summary', { total, checkedOutCount, availableCount });
});

// Start server
app.listen(3333, () => console.log('Server running at http://localhost:3333'));
