const { connection } = require('../connection');

const selectTopics = () => {
    return connection('topics')
        .select('*');
};

const insertTopic = (topic) => {
    return connection('topics')
        .insert(topic)
        .returning('*');
};

const delTopic = (slug) => {
    return connection('topics')
        .where('slug', slug)
        .del();
};

module.exports = { selectTopics, insertTopic, delTopic };