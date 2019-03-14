const { selectTopics, insertTopic } = require('../models/topics-models');

const getTopics = (req, res, next) => {
    return selectTopics()
        .then(topics => {
            res.status(200).send({ topics });
        })
        .catch(err => {
            next({code: 500, message: 'Unhandled error at getTopics'})
        })
};

const postTopic = (req, res, next) => {
    return insertTopic(req.body)
        .then(([topic]) => {
            res.status(201).send({ topic });
        })
        .catch(err => {
            if (err.code === '23505') {
                next({ code: 422, message: 'Topic already exists!' });
            } else if (err.code === '23502') {
                next({ code: 400, message: 'Topic information not valid!' });
            } else {
                next(err);
            };
        });
};

module.exports = { getTopics, postTopic }