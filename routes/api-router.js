const { usersRouter } = require('./users-router');
const { topicsRouter } = require('./topics-router');
const { articlesRouter } = require('./articles-router')
const { commentsRouter } = require('./comments-router');
const apiRouter = require('express').Router();
const { apiHelper } = require('../controllers/api-controller');

apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/', apiHelper);

module.exports = { apiRouter };