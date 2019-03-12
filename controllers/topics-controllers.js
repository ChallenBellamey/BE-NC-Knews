const { selectTopics, insertTopic } = require('../models/topics-models');

const getTopics = (req, res, next) => {
    return selectTopics()
        .then(topics => {
            res.status(200).send({ topics });
        })
};

const postTopic = (req, res, next) => {
    return insertTopic(req.body)
        .then(([topic]) => {
            res.status(201).send({ topic });
        })
}

module.exports = { getTopics, postTopic }