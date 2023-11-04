const router = require('express').Router();
const passport = require('passport');

const authController = require('../app/controllers/AuthController');

router.get('/login/success', authController.create_or_update);

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Log in failure',
    });
});

router.get('/google', passport.authenticate('google', ['profile', 'email']));

router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:4000',
        failureRedirect: '/login/failed',
    }),
);

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('http://localhost:4000');
    });
});

router.get('/test', (req, res) => res.send('Hello World'));

module.exports = router;
