const createRef = require('../../utils/createRef').createRef;

const ENV = process.env.NODE_ENV || 'development';
const { articleData, commentData, topicData, userData } = require(`../data/${ENV}-data/index`);

exports.seed = (knex, Promise) => {
    return knex.migrate
        .rollback()
        .then(() => knex.migrate.latest())
        .then(() => {
            return knex('topics')
                .insert(topicData)
                .returning('*');
        })
        .then(topicRows => {
            return knex('users')
                .insert(userData)
                .returning('*');
        })
        .then(userRows => {
            articleData.forEach(article => {
                const date = article.created_at;
                article.created_at = new Date (date);
            })
            return knex('articles')
                .insert(articleData)
                .returning('*');
        })
        .then(articleRows => {
            const articleRef1 = createRef(articleRows, 'title', 'article_id');
            commentData.forEach(comment => {
                comment.created_at = new Date (comment.created_at);

                comment.article_id = articleRef1[comment.belongs_to];
                delete comment.belongs_to;

                comment.author = comment.created_by;
                delete comment.created_by;
            })
            return knex('comments')
                .insert(commentData);
        })
}