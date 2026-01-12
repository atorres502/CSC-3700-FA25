const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', (req, res) => res.redirect('/books'));
router.get('/books', bookController.listBooks);
router.get('/books/new', bookController.newBookForm);

router.post('/books', bookController.createBook);

module.exports = router;
