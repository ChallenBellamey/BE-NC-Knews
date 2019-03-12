const { connection } = require('../connection');

const selectTopics = () => {
    return connection('topics').select('*');
};

const insertTopic = (topic) => {
    return connection('topics').insert(topic).returning('*');
};

module.exports = { selectTopics, insertTopic };