const { connection } = require('../connection')

const selectUsers = () => {
    return connection('users')
        .select('users.username', 'users.socket_id', 'users.last_online')
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

const loginUser = ({username, socket}) => {
    return connection('users')
        .where('username', username)
        .update({'socket_id': socket.id})
        .returning('*');
};

const logoutUser = ({socket_id}) => {
    return connection('users')
        .where('socket_id', socket_id)
        .update({'socket_id': null, 'last_online': new Date()});
};

module.exports = { selectUsers, insertUser, selectUser, loginUser, logoutUser };