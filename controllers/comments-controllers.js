const { selectCommentById, selectCommentsByArticle, insertCommentByArticle, updateComment, delComment } = require('../models/comments-models')

const getCommentsByArticle = (req, res, next) => {
    selectCommentsByArticle(req.params.article_id, req.query)
        .then(comments => {
            if (comments.length > 0) {
                res.status(200).send({ comments });
            } else {
                throw({ code: 404, message: 'Article not found!' });
            };
        })
        .catch(err => {
            if (err.code === '22P02') {
                err = { code: 400, message: 'Article id invalid!'}
            } else if (err.code !== 404) {
                err = {code: 500, message: `Unhandled error at getCommentsByArticle: ${err.code} ${err.message}`}
            };
            next(err);
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
                if (err.message.slice(200, 207) === 'article') {
                    err = { code: 404, message: 'Article not found!' };
                } else if (err.message.slice(200, 206) === 'author') {
                    err = { code: 422, message: 'User does not exist!' };
                };
            } else {
                err = {code: 500, message: `Unhandled error at postCommentByArticle: ${err.code} ${err.message}`};
            };
            next(err);
        });
};

const patchComment = (req, res, next) => {
    updateComment(req.params.comment_id, req.body)
        .then(([comment]) => {
            if (comment) {
                res.status(200).send({ comment });
            } else {
                throw({ code: 404, message: 'Comment not found!' });
            };
        })
        .catch(err => {
            if (err.code === '22P02') {
                err = { code: 400, message: 'Invalid comment id!'}
            } else if (err.code === '42703') {
                err = { code: 400, message: 'Invalid inc_votes!' };
            } else if (err.code !== 404) {
                err = { code: 500, message: `Unhandled error at patchComment: ${err.code} ${err.message}` }
            };
            next(err);
        })
};

const deleteComment = (req, res, next) => {
    Promise.all([
        req.params.comment_id,
        selectCommentById(req.params.comment_id)
    ])
        .then(([comment_id, comments]) => {
            if (comments.length === 1) {
                delComment(comment_id)
            } else {
                throw({ code: 404, message: 'Comment not found!' });
            };
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch(err => {
            if (err.code !== 404) {
                err = { code: 500, message: `Unhandled error at deleteComment: ${err.code} ${err.message}`}
            };
            next(err);
        })
};

module.exports = { getCommentsByArticle, postCommentByArticle, patchComment, deleteComment };