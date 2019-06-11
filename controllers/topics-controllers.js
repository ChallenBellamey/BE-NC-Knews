const { selectTopics, insertTopic, delTopic } = require('../models/topics-models');

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

const deleteTopic = (req, res, next) => {
    delTopic(req.params.slug)
        .then((deletes) => {
            if (deletes === 1) res.sendStatus(204)
            else throw({ code: 404, message: 'Topic not found!' })
        })
        .catch(err => {
            if (err.code !== 404) {
                err = { code: 500, message: `Unhandled error at deleteTopic: ${err.code} ${err.message}`}
            };
            next(err);
        })
};

module.exports = { getTopics, postTopic, deleteTopic }