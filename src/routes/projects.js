const express = require('express');
const router = express.Router();

const projectController = require('../app/controllers/ProjectController');

// http:localhost:3000/project/:slug
router.get('/:slug', projectController.get);
// http:localhost:3000/project
router.get('/', projectController.getAll);
// http:localhost:3000/project
router.post('/', projectController.create);
// http:localhost:3000/project/:slug/isChecked
router.put('/:slug/isChecked', projectController.updateIsChecked);
// http:localhost:3000/project/:slug
router.put('/:slug', projectController.update);
// http:localhost:3000/project/:slug
router.delete('/:slug', projectController.delete);

module.exports = router;
