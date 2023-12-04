const express = require('express');
const router = express.Router();

const projectController = require('../app/controllers/ProjectController');


router.get('/project-uni', projectController.getProjectUnis);
router.get('/:slug', projectController.get);
router.put('/:slug/isChecked', projectController.updateIsChecked);
router.put('/', projectController.update);
router.delete('/:slug', projectController.delete);
router.get('/', projectController.getAll);
router.post('/', projectController.create);
module.exports = router;
