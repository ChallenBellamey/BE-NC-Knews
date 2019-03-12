const { connection } = require('../connection')

const selectAllUsers = () => {
    return connection('users')
        .select('*')
};

const insertUser = (user) => {
    return connection('users')
        .insert(user)
        .returning('*')
};

module.exports = { selectAllUsers, insertUser };