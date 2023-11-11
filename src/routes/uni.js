const express = require('express');
const router = express.Router();

const uniController = require('../app/controllers/UniController');

router.get('/:slug', uniController.show);
router.post('/create', uniController.create);
router.post('/update', uniController.update);
router.delete('/:slug', uniController.delete);
router.get('/', uniController.index);

module.exports = router;
