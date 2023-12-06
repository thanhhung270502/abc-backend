const { verifyToken, isCommunityLeader, isUniveristyAdmin } = require('../app/middlewares/authMiddleware');

const express = require('express');
const router = express.Router();
const projectController = require('../app/controllers/ProjectController');

router.put('/isChecked/:slug', isUniveristyAdmin, projectController.updateIsChecked);
router.get('/approved', projectController.getProjectApproved);
router.get('/me', verifyToken, projectController.getMyProject);
router.get('/project-uni', projectController.getProjectUnis);
router.get('/:slug', projectController.get);
router.delete('/:slug', isCommunityLeader, projectController.delete);
router.put('/', isCommunityLeader, projectController.update);
router.get('/', projectController.getAll);
router.post('/', isCommunityLeader, projectController.create);

module.exports = router;
