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

module.exports = { selectArticles, insertArticle }