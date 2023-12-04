const siteRouter = require('./site');
const usersRouter = require('./users');
const abilityRouter = require('./ability');
const projectsRouter = require('./projects');
const universityRouter = require('./uni');
const projectUserRouter = require('./project_user');

function route(app) {
    app.use('/project-user', projectUserRouter);
    app.use('/unis', universityRouter);
    app.use('/abilitys', abilityRouter);
    app.use('/users', usersRouter);
    app.use('/projects', projectsRouter);
    app.use('/', siteRouter);
}

module.exports = route;
