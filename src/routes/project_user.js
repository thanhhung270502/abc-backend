const express = require('express');
const router = express.Router();
const {isStudent, isCommunityLeader, verifyToken} = require('../app/middlewares/authMiddleware')
const projectUserController = require('../app/controllers/ProjectUsersController');

router.get('/getByProjectID/:project_id', verifyToken, projectUserController.getByProjectID);
router.delete('/:slug', isStudent, projectUserController.delete);
router.post('/', isStudent, projectUserController.create);
router.put('/', isCommunityLeader, projectUserController.updateIsChecked);
router.get('/', projectUserController.index);

module.exports = router;
