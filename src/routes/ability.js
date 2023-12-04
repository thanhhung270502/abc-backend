const express = require('express');
const router = express.Router();

const abilityController = require('../app/controllers/AbilityController');

router.get('/:slug', abilityController.show);
router.delete('/:slug', abilityController.delete);
router.put('/:slug', abilityController.update);
router.post('/', abilityController.create);
router.get('/', abilityController.index);

module.exports = router;
