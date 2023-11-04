const siteRouter = require('./site');
const usersRouter = require('./users');
const authRouter = require('./auth');
const uniRouter = require('./uni');

function route(app) {
    app.use('/uni', uniRouter);
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
