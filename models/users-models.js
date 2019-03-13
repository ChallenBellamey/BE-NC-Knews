const { connection } = require('../connection')

const selectUsers = () => {
    return connection('users')
        .select('*')
};

const insertUser = (user) => {
    return connection('users')
        .insert(user)
        .returning('*')
};

const selectUser = (username) => {
    return connection('users')
        .select('*')
        .where('username', username)
};

module.exports = { selectUsers, insertUser, selectUser };