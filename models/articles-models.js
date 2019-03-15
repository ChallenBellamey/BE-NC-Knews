const { connection } = require('../connection');

const selectArticles = ({ sort_by = 'created_at', order = 'desc', limit, p = 0, ...conditions }) => {
    const whereConditions = {};
    Object.keys(conditions).forEach(conditionKey => {
        whereConditions[`articles.${conditionKey}`] = conditions[conditionKey];
    });
    let offset;
    if (limit) {
        offset = (p - 1) * limit;
    } else {
        limit = 10**100;
        offset = 0;
    };
    return connection
        .select('articles.article_id', 'articles.title', 'articles.body', 'articles.votes', 'articles.topic', 'articles.author', 'articles.created_at')
        .from('articles')
        .leftJoin('comments', 'articles.article_id', 'comments.article_id')
        .count('comments.article_id as comment_count')
        .groupBy('comments.article_id', 'articles.article_id')
        .where(whereConditions)
        .orderBy(sort_by, order)
        .limit(limit)
        .offset(offset)
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

const updateArticle = (article_id, { inc_votes = 0, ...updates }) => {
    return connection('articles')
        .where('article_id', article_id)
        .update({'votes': connection.raw(`votes + ${inc_votes}`), ...updates }, ['article_id', 'title', 'body', 'votes', 'topic', 'author', 'created_at'])
};

const delArticle = (article_id) => {
    return connection('articles')
        .where('article_id', article_id)
        .del()
};

module.exports = { selectArticles, insertArticle, selectArticle, updateArticle, delArticle }