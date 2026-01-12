const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.showBooks);
router.get('/summary', bookController.showSummary);

module.exports = router;
