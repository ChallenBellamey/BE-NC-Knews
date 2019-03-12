const { selectArticles, insertArticle } = require('../models/articles-models');

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

module.exports = { getArticles, postArticle };