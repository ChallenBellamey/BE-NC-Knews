const topicsRouter = require('express').Router();
const { getTopics, postTopic } = require('../controllers/topics-controllers');

topicsRouter.route('/')
    .get(getTopics)
    .post(postTopic)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

module.exports = { topicsRouter };