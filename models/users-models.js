const { connection } = require('../connection')

const selectUsers = () => {
    return connection('users')
        .select('users.username', 'users.last_online')
        .from('users')
        .orderBy('last_online', 'desc')
        .limit(10)
};

const insertUser = (user) => {
    return connection('users')
        .insert(user)
        .returning('*')
};

const loginUser = ({username, password, last_online}) => {
    return connection('users')
        .where({username, password})
        .update({last_online})
        .returning('*');
};

const logoutUser = ({username, last_online}) => {
    return connection('users')
        .where({username})
        .update({last_online});
};

module.exports = { selectUsers, insertUser, loginUser, logoutUser };