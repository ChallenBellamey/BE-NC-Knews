const { selectArticles, insertArticle, selectArticle, updateArticle, delArticle } = require('../models/articles-models');

const getArticles = (req, res, next) => {
    selectArticles(req.query)
        .then((articles) => {
            res.status(200).send({ articles });
        })
        .catch(err => {
            next({code: 500, message: `Unhandled error at getArticles: ${err.code} ${err.message}`});
        })
};

const postArticle = (req, res, next) => {
    insertArticle(req.body)
        .then(([article]) => {
            res.status(201).send({ article });
        })
        .catch(err => {
            if (err.code = '23502') {
                err = { code: 400, message: 'Article information not valid!' };
            } else {
                err = { code: 500, message: `Unhandled error at postArticle: ${err.code} ${err.message}`};
            };
            next(err);
        });
};

const getArticle = (req, res, next) => {
    selectArticle(req.params.article_id)
        .then(([article]) => {
            if (article) {
                res.status(200).send({ article });
            } else {
                throw({ code: 404, message: 'Article not found!' })
            };  
        })
        .catch(err => {
            if (err.code === '22P02') {
                err = { code: 400, message: 'Article id invalid!' };
            } else if (err.code !== 404) {
                err = { code: 500, message: `Unhandled error at getArticle: ${err.code} ${err.message}`};
            };
            next(err);
        });
};

const patchArticle = (req, res, next) => {
    updateArticle(req.params.article_id, req.body)
        .then(([article]) => {
            if (article) {
                res.status(200).send({ article });
            } else {
                throw({ code: 404, message: 'Article not found!' });
            };
        })
        .catch(err => {
            if (err.code === '42703') {
                err = { code: 400, message: 'inc_votes invalid!' };
            } else if (err.code !== 404) {
                err = { code: 500, message: `Unhandled error at patchArticle: ${err.code} ${err.message}`};
            };
            next(err);
        });
};

const deleteArticle = (req, res, next) => {
    delArticle(req.params.article_id)
        .then((deletes) => {
            if (deletes === 1) res.sendStatus(204)
            else throw({ code: 404, message: 'Article not found!'})
        })
        .catch(err => {
            if (err.code === '22P02') {
                err = { code: 400, message: 'Invalid article_id!' }
            } else if (err.code !== 404) {
                err = { code: 500, message: `Unhandled error at deleteArticle: ${err.code} ${err.message}`};
            };
            next(err)
        })
};

module.exports = { getArticles, postArticle, getArticle, patchArticle, deleteArticle };