const { selectArticles, insertArticle, selectArticle, updateArticle, delArticle } = require('../models/articles-models');

const getArticles = (req, res, next) => {
    return selectArticles()
        .then((articles) => {
            res.status(200).send({ articles });
        })
        .catch(next);
};

const postArticle = (req, res, next) => {
    return insertArticle(req.body)
        .then(([article]) => {
            res.status(201).send({ article });
        })
        .catch(err => {
            if (err.code = '23502') {
                next({ code: 400, message: 'Article information not valid!' });
            } else {
                next(err);
            };
        });
};

const getArticle = (req, res, next) => {
    return selectArticle(req.params.article_id)
        .then(([article]) => {
            if (article === undefined) {
                throw({ code: 404, message: 'Article not found!' })
            } else {
                res.status(200).send({ article });
            };  
        })
        .catch(next);
};

const patchArticle = (req, res, next) => {
    return updateArticle(req.params.article_id, req.body)
        .then(([article]) => {
            res.status(201).send({ article });
        })
        .catch(err => {
            next({ code: 404, message: 'Article not found!' });
        });
};

const deleteArticle = (req, res, next) => {
    return delArticle(req.params.article_id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(next);
};

module.exports = { getArticles, postArticle, getArticle, patchArticle, deleteArticle };