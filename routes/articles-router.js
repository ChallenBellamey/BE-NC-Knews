const apiRouter = require('./api-router');
const articlesRouter = require('express').Router();
const { getArticles, postArticle, getArticle, patchArticle, deleteArticle } = require('../controllers/articles-controllers');
const { getCommentsByArticle, postCommentByArticle } = require('../controllers/comments-controllers');

articlesRouter.route('/')
    .get(getArticles)
    .post(postArticle)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticle)
    .post(postCommentByArticle)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

articlesRouter.route('/:article_id')
    .get(getArticle)
    .patch(patchArticle)
    .delete(deleteArticle)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

module.exports = { articlesRouter };