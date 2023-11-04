const siteRouter = require('./site');
const usersRouter = require('./users');
const authRouter = require('./auth');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
