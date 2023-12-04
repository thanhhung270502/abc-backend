const express = require('express');
const router = express.Router();

const projectUserController = require('../app/controllers/ProjectUsersController');

router.get('/getByProjectID/:project_id', projectUserController.getByProjectID);
router.delete('/:slug', projectUserController.delete);
router.post('/', projectUserController.create);
router.put('/', projectUserController.updateIsChecked);
router.get('/', projectUserController.index);

module.exports = router;
