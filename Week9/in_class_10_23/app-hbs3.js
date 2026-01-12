const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

// Configure express-handlebars with .hbs and layouts dir
app.engine('hbs', engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    defaultLayout: 'layout' // uses views/layouts/layout.hbs
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

const books = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', checkedOut: true },
    { title: '1984', author: 'George Orwell', checkedOut: false },
    { title: 'Dune', author: 'Frank Herbert', checkedOut: true },
    { title: 'Pride and Prejudice', author: 'Jane Austen', checkedOut: false }
];

app.get('/', (req, res) => {
    res.render('home', { title: 'Library Home', books });
});

app.get('/summary', (req, res) => {
    const total = books.length;
    const checkedOutCount = books.filter(b => b.checkedOut).length;
    const availableCount = total - checkedOutCount;

    res.render('summary', {
        title: 'Library Summary',
        total,
        checkedOutCount,
        availableCount
    });
});

app.listen(3333, () =>
    console.log('Server running at http://localhost:3333')
);
