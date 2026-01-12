const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
require('dotenv').config(); // Load .env variables into preocess.env

const app = express();
const morgan = require('morgan');
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}
// parse forms (future CRUD) + static
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// handlebars setup
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// locals
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
});

const routes = require('./routes');
app.use('/', routes);

// 404 & 500
app.use((req, res) => res.status(404).render('404', { title: 'Not Found' }));
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).render('500', { title: 'Server Error' });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
