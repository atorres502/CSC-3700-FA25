const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/books.json');

function readBooks() {
    if (!fs.existsSync(DATA_PATH)) return [];
    const raw = fs.readFileSync(DATA_PATH, 'utf8') || '[]';
    return JSON.parse(raw);
}
function writeBooks(list) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(list, null, 2), 'utf8');
}

exports.listBooks = (req, res) => {
    const books = readBooks();
    res.render('books', { title: 'Books', books });
};

exports.newBookForm = (req, res) => {
    res.render('newBook', { title: 'Add Book' });
};

exports.createBook = (req, res) => {
    const { title, author, isbn } = req.body;
    const errors = [];
    if (!title || !title.trim()) errors.push('Title is required.');
    if (!author || !author.trim()) errors.push('Author is required.');

    if (errors.length) {
        return res.status(400).render('newBook', {
            title: 'Add Book',
            errors,
            values: { title, author, isbn }
        });
    }

    const books = readBooks();
    const newBook = {
        id: 'b_' + Date.now(),
        title: title.trim(),
        author: author.trim(),
        isbn: (isbn || '').trim()
    };
    books.push(newBook);
    writeBooks(books);

    res.redirect('/books'); // PRG pattern
};

