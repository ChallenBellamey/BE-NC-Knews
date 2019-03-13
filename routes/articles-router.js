const apiRouter = require('./api-router');
const articlesRouter = require('express').Router();
const { getArticles, postArticle, getArticle, patchArticle, deleteArticle } = require('../controllers/articles-controllers');

articlesRouter.route('/')
    .get(getArticles)
    .post(postArticle)

articlesRouter.route('/:article_id')
    .get(getArticle)
    .patch(patchArticle)
    .delete(deleteArticle)

module.exports = { articlesRouter };