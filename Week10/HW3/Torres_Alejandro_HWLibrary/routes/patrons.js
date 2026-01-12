const express = require('express');
const router = express.Router();
const patronController = require('../controllers/patronController');

router.get('/', patronController.list);

router.get('/summary', patronController.summary);

router.get('/:id', patronController.details);

module.exports = router;