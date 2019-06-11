const topicsRouter = require('express').Router();
const { getTopics, postTopic, deleteTopic } = require('../controllers/topics-controllers');

topicsRouter.route('/')
    .get(getTopics)
    .post(postTopic)
    .delete(deleteTopic)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

module.exports = { topicsRouter };