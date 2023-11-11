const express = require('express');
const router = express.Router();

const uniController = require('../app/controllers/UniController');

router.get('/:slug', uniController.show);
router.post('/', uniController.create);
router.put('/', uniController.update);
router.delete('/:slug', uniController.delete);
router.get('/', uniController.index);

module.exports = router;
