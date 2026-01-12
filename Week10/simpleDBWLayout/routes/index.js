//THE router file
const express = require('express');
const router = express.Router();
const candyController = require('../controllers/candyController');

// Home → candy list
router.get('/', candyController.list);

// You can also expose /candy explicitly if you want:
// router.get('/candy', candyController.list);

module.exports = router;
