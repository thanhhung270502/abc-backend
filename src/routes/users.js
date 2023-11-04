const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.get('/:slug', usersController.show);
router.post('/', usersController.create);
router.get('/', usersController.index);

module.exports = router;
