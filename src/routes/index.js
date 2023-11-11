const siteRouter = require('./site');
const usersRouter = require('./users');
const authRouter = require('./auth');
const abilityRouter = require('./ability');
const projectsRouter = require('./projects');
const uniRouter = require('./uni')
function route(app) {
    app.use('/ability', abilityRouter);
    app.use('/auth', authRouter);
    app.use('/uni', uniRouter);
    app.use('/users', usersRouter);
    app.use('/project', projectsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
