const { selectCommentsByArticle, insertCommentByArticle, updateComment, delComment } = require('../models/comments-models')

const getCommentsByArticle = (req, res, next) => {
    selectCommentsByArticle(req.params.article_id)
        .then(comments => {
            res.status(200).send({ comments })
        })
        .catch(err => {
            next({code: 500, message: `Unhandled error at getCommentsByArticle: ${err.code} ${err.message}`});
        })
};

const postCommentByArticle = (req, res, next) => {
    insertCommentByArticle(req.params.article_id, req.body)
        .then(([comment]) => {
            res.status(201).send({ comment })
        })
        .catch(err => {
            if (err.code === '42703') {
                err = { code: 400, message: 'Comment information not valid!' };
            } else if (err.code === '23503') {
                err = { code: 404, message: 'Article not found!' };
            } else {
                err = {code: 500, message: `Unhandled error at postCommentByArticle: ${err.code} ${err.message}`};
            };
            next(err);
        });
};

const patchComment = (req, res, next) => {
    updateComment(req.params.comment_id, req.body)
        .then(([comment]) => {
            res.status(201).send({ comment });
        })
        .catch(err => {
            next({ code: 500, message: `Unhandled error at patchComment: ${err.code} ${err.message}`});
        })
};

const deleteComment = (req, res, next) => {
    delComment(req.params.comment_id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => {
            next({ code: 500, message: `Unhandled error at deleteComment: ${err.code} ${err.message}`})
        })
};

module.exports = { getCommentsByArticle, postCommentByArticle, patchComment, deleteComment };