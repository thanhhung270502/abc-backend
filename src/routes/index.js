const siteRouter = require('./site');
const usersRouter = require('./users');
const authRouter = require('./auth');
const abilityRouter = require('./ability');
const projectsRouter = require('./projects');
const sessionsRouter = require('./sessions');

function route(app) {
    app.use('/ability', abilityRouter);
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/project', projectsRouter);
    app.use('/sessions', sessionsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
