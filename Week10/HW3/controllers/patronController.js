const books = [
    { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', checkedOut: true },
    { id: 2, title: '1984', author: 'George Orwell', checkedOut: false },
    { id: 3, title: 'Dune', author: 'Frank Herbert', checkedOut: true }
];

const patrons = [
    { id: 1, name: 'Alice', checkedOutBooks: [1, 3] },
    { id: 2, name: 'Bob', checkedOutBooks: [] },
    { id: 3, name: 'Charlie', checkedOutBooks: [2] }
];

exports.list = (req, res) => {
    res.render('patrons', { patrons });
};

exports.details = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).send('Bad patron id');

    const patron = patrons.find(p => p.id === id);
    if (!patron) return res.status(404).send('Patron not found');

    const checkedOut = books.filter(b => patron.checkedOutBooks.includes(b.id));
    res.render('patronDetails', { patron, books: checkedOut });
};

exports.summary = (req, res) => {
    const total = patrons.length;
    const totalChecked = patrons.reduce((n, p) => n + p.checkedOutBooks.length, 0);
    const avgPerPatron = total ? (totalChecked / total).toFixed(2) : 0;
    res.render('patronSummary', { total, totalChecked, avgPerPatron });
};

module.exports = { patrons, list: exports.list, details: exports.details, summary: exports.summary };
