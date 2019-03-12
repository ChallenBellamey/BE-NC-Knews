const { usersRouter } = require('./users-router');
const { topicsRouter } = require('./topics-router');
const { articlesRouter } = require('./articles-router')
const apiRouter = require('express').Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('./articles', articlesRouter);

module.exports = { apiRouter };