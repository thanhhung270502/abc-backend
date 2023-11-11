const express = require('express');
const router = express.Router();

const projectUserController = require('../app/controllers/UserProject');

router.get('/getByProjectID/:project_id', projectUserController.getByProjectID);
router.post('/', projectUserController.create);
router.get('/', projectUserController.index);

module.exports = router;
