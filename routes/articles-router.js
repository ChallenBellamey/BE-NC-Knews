const apiRouter = require('./api-router');
const articlesRouter = require('express').Router();
const { getArticles, postArticle } = require('../controllers/articles-controllers');

articlesRouter.route('/')
    .get(getArticles)
    .post(postArticle)

module.exports = { articlesRouter };