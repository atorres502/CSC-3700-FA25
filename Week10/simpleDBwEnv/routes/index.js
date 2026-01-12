const express = require('express');
const router = express.Router();
const candyController = require('../controllers/candyController');

// Home → candy list
router.get('/', candyController.list);

router.get('/:id', candyController.show);


module.exports = router;