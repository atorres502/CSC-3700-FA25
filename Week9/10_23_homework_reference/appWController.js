'use strict';
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();

app.engine(
    'hbs',
    engine({
        extname: '.hbs', // enable .hbs extension
        defaultLayout: 'layout', // looks for views/layouts/layout.hbs
        layoutsDir: path.join(__dirname, 'views', 'layouts'),
    })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const bookRoutes = require('./routes/books');
app.use('/', bookRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
