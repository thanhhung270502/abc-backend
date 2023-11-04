const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GOOGLE_CLIENT_ID = '166927528877-slh38kg3sq5v1d6gtcbgm9o0284p7kp4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['profile', 'email'],
        },
        function (accessToken, refreshToken, profile, callback) {
            callback(null, profile);
        },
    ),
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
