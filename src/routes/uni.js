const express = require('express');
const router = express.Router();

const uniController = require('../app/controllers/UniController');

router.get('/:slug', uniController.show);
router.delete('/:slug', uniController.delete);
router.put('/:slug', uniController.update);
router.post('/', uniController.create);
router.get('/', uniController.index);

module.exports = router;
