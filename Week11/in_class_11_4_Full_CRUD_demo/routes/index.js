// routes/index.js
const express = require('express');
const router = express.Router();
const candyController = require('../controllers/candyController');

// READ all
router.get('/', candyController.list);

// CREATE (specific route BEFORE any :id route)
router.get('/candy/new', candyController.newForm);
router.post('/candy', candyController.create);

// UPDATE (specific route BEFORE any :id route)
router.get('/candy/:id/edit', candyController.editForm);
router.put('/candy/:id', candyController.update);

// DELETE
router.delete('/candy/:id', candyController.destroy);

// READ one (generic route LAST so it doesn’t catch /new or /:id/edit)
router.get('/candy/:id', candyController.show);

module.exports = router;