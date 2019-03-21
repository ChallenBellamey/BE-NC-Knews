const { connection } = require('../connection');

const selectCommentById = (comment_id) => {
    return connection('comments')
        .select('*')
        .where('comment_id', comment_id)
};

const selectCommentsByArticle = (article_id, {sort_by = 'created_at', order = 'desc', limit = 100, p = 1}) => {
    return connection('comments')
        .select('*')
        .where('article_id', article_id)
        .orderBy(sort_by, order)
        .limit(limit)
        .offset((p - 1) * limit)
};

const insertCommentByArticle = (article_id, comment) => {
    comment.article_id = article_id;
    comment.created_at = new Date (Date.now());
    comment.votes = 0;
    comment.author = comment.username;
    delete comment.username;
    return connection('comments')
        .insert(comment)
        .returning('*')
};

const updateComment = (comment_id, { inc_votes = 0, ...updates }) => {
    return connection('comments')
        .where('comment_id', comment_id)
        .update({'votes': connection.raw(`votes + ${inc_votes}`), ...updates }, ['comment_id', 'author', 'article_id', 'votes', 'created_at', 'body'])
};

const delComment = (comment_id) => {
    return connection('comments')
        .where('comment_id', comment_id)
        .del()
};

module.exports = { selectCommentById, selectCommentsByArticle, insertCommentByArticle, updateComment, delComment };