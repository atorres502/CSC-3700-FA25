// routes/index.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// READ all
router.get('/', studentController.list);

// CREATE (specific route BEFORE any :id route)
router.get('/student/new', studentController.newForm);
router.post('/student', studentController.create);

// UPDATE (specific route BEFORE any :id route)
router.get('/student/:id/edit', studentController.editForm);
router.put('/student/:id', studentController.update);

// DELETE
router.delete('/student/:id', studentController.destroy);

// READ one (generic route LAST so it doesn’t catch /new or /:id/edit)
router.get('/student/:id', studentController.show);

module.exports = router;