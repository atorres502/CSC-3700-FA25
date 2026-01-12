const books = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', checkedOut: true },
    { title: '1984', author: 'George Orwell', checkedOut: false },
    { title: 'Dune', author: 'Frank Herbert', checkedOut: true }
];

exports.showBooks = (_req, res) => {
    res.render('home', {
        title: 'Library - Books',
        books
    });
};

exports.showSummary = (_req, res) => {
    const total = books.length;
    const checkedOut = books.filter(b => b.checkedOut).length;
    const available = total - checkedOut;

    res.render('summary', {
        title: 'Library - Summary',
        total,
        checkedOut,
        available
    });
};
