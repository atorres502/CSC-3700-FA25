
const express = require('express');
const candyController = require('../controllers/candyController');

const router = express.Router();

// /api/v1/candy
router.get('/candy', candyController.list);
router.get('/candy/:id', candyController.show);
router.post('/candy', candyController.create);
router.put('/candy/:id', candyController.update);
router.delete('/candy/:id', candyController.remove);

module.exports = router;   // export CommonJS-style

