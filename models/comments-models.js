const { connection } = require('../connection');

const selectCommentsByArticle = (article_id) => {
    return connection('comments')
        .select('*')
        .where('article_id', article_id)
};

const insertCommentByArticle = (article_id, comment) => {
    comment.article_id = article_id;
    comment.created_at = new Date (Date.now());
    comment.votes = 0;
    return connection('comments')
        .insert(comment)
        .returning('*')
};

const updateComment = (comment_id, updates) => {
    return connection('comments')
        .where('comment_id', comment_id)
        .update(updates, ['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body'])
};

const delComment = (comment_id) => {
    return connection('comments')
        .where('comment_id', comment_id)
        .del()
};

module.exports = { selectCommentsByArticle, insertCommentByArticle, updateComment, delComment };