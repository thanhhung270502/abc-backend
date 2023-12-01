const siteRouter = require('./site');
const usersRouter = require('./users');
const authRouter = require('./auth');
const abilityRouter = require('./ability');
const projectsRouter = require('./projects');
const sessionsRouter = require('./sessions');
const universityRouter = require('./uni');
const projectUserRouter = require('./project_user');

function route(app) {
    app.use('/projectUser', projectUserRouter);
    app.use('/uni', universityRouter);
    app.use('/ability', abilityRouter);
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/project', projectsRouter);
    app.use('/sessions', sessionsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
