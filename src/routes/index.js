const siteRouter = require('./site');
const usersRouter = require('./users');
const authRouter = require('./auth');
const abilityRouter = require('./ability');

function route(app) {
    app.use('/ability', abilityRouter);
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/', siteRouter);
}

module.exports = route;
