const express = require('express');
const cors = require('cors');
const route = require('./routes');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = 80;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET',
    }),
);


// Routes
route(app);

if (!module.parent) {
    app.listen(PORT, () => {
        console.log('Server on port', PORT);
    });
}

module.exports = app;
