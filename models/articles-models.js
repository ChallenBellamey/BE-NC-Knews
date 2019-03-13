const { connection } = require('../connection');

const selectArticles = () => {
    return connection('articles')
        .select('*');
};

const insertArticle = (article) => {
    return connection('articles')
        .insert(article)
        .returning('*');
};

const selectArticle = (article_id) => {
    return connection('articles')
        .select('*')
        .where('article_id', article_id)
};

const updateArticle = (article_id, updates) => {
    return connection('articles')
        .where('article_id', article_id)
        .update(updates, ['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at'])
};

const delArticle = (article_id) => {
    return connection('articles')
        .where('article_id', article_id)
        .del()
};

module.exports = { selectArticles, insertArticle, selectArticle, updateArticle, delArticle }