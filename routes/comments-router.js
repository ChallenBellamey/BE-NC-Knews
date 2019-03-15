const { patchComment, deleteComment } = require('../controllers/comments-controllers');
const commentsRouter = require('express').Router();

commentsRouter.route('/:comment_id')
    .patch(patchComment)
    .delete(deleteComment)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

module.exports = { commentsRouter };