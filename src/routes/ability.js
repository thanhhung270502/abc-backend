const express = require('express');
const router = express.Router();

const abilityController = require('../app/controllers/AbilityController');

router.get('/:slug', abilityController.show);
router.post('/', abilityController.create);
router.get('/', abilityController.index);

module.exports = router;
