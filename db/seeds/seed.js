const {createRef, formatArticleData, formatCommentData } = require('../../utils/seedFunctions');
const data = require('../data/index');
const { articleData, commentData, topicData, userData } =  data;

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
            return knex('articles')
                .insert(formatArticleData(articleData))
                .returning('*');
        })
        .then(articleRows => {
            const articleRef = createRef(articleRows, 'title', 'article_id');
            return knex('comments')
                .insert(formatCommentData(commentData, articleRef));
        })
}