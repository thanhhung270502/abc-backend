const express = require('express');
const cors = require('cors');
const route = require('./routes');
const session = require('express-session');
const passport = require('passport');
const passportStrategy = require('./passport');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: 'http://localhost:3001',
        credentials: true,
    }),
);

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET',
    }),
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
route(app);

app.listen(PORT, () => {
    console.log('Server on port', PORT);
});
