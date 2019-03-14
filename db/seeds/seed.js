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
            let newArticleData = [ ...articleData ];
            newArticleData = newArticleData.map(article => {
                const newArticle = { ...article };
                const date = newArticle.created_at;
                newArticle.created_at = new Date (date);

                return newArticle;
            })
            return knex('articles')
                .insert(newArticleData)
                .returning('*');
        })
        .then(articleRows => {
            const articleRef1 = createRef(articleRows, 'title', 'article_id');
            let newCommentData = [ ...commentData ];
            newCommentData = newCommentData.map(comment => {
                const newComment = { ...comment };

                newComment.created_at = new Date (newComment.created_at);

                newComment.article_id = articleRef1[newComment.belongs_to];
                delete newComment.belongs_to;

                newComment.author = newComment.created_by;
                delete newComment.created_by;

                return newComment;
            })
            return knex('comments')
                .insert(newCommentData);
        })
}