const { connection } = require('../connection')

const selectUsers = () => {
    return connection('users')
        .select('users.username', 'users.online', 'users.last_online')
        .from('users')
        .orderBy('last_online', 'desc')
        .limit(10)
};

const insertUser = (user) => {
    return connection('users')
        .insert(user)
        .returning('*')
};

const selectUser = ({username, password}) => {
    return connection('users')
        .select('*')
        .where({'username': username, 'password': password})
};

const loginUser = ({username}) => {
    return connection('users')
        .where('username', username)
        .update({'online': true})
        .returning('*');
};

const logoutUser = ({username}) => {
    return connection('users')
        .where('username', username)
        .update({'online': false, 'last_online': new Date()});
};

module.exports = { selectUsers, insertUser, selectUser, loginUser, logoutUser };