const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ✅ express-handlebars using .hbs and a layout (no partials needed here)
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// (optional) make {{year}} available to all views
app.use((req, res, next) => { res.locals.year = new Date().getFullYear(); next(); });

// ✅ Mount routes
const bookRoutes = require('./routes/books');
app.use('/', bookRoutes);

const PORT = 3333;
app.listen(PORT, () =>
    console.log(`http://localhost:${PORT}`));;
