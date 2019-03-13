const { selectArticles, insertArticle, selectArticle, updateArticle, delArticle } = require('../models/articles-models');

const getArticles = (req, res, next) => {
    return selectArticles()
        .then((articles) => {
            res.status(200).send({ articles });
        })
};

const postArticle = (req, res, next) => {
    return insertArticle(req.body)
        .then(([article]) => {
            res.status(201).send({ article });
        })
};

const getArticle = (req, res, next) => {
    return selectArticle(req.params.article_id)
        .then(([article]) => {
            res.status(200).send({ article });
        })
};

const patchArticle = (req, res, next) => {
    return updateArticle(req.params.article_id, req.body)
        .then(([article]) => {
            res.status(201).send({ article });
        })
};

const deleteArticle = (req, res, next) => {
    return delArticle(req.params.article_id)
        .then(() => {
            res.sendStatus(204);
        })
};

module.exports = { getArticles, postArticle, getArticle, patchArticle, deleteArticle };