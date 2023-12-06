const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.put('/:slug', usersController.update);
router.get('/:slug', usersController.show);
router.delete('/:slug', usersController.delete);
router.post('/signup', usersController.create);
router.post('/login', usersController.authUser);
router.get('/', usersController.index);

module.exports = router;
