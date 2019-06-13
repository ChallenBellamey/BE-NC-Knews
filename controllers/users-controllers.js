const { selectUsers, insertUser, selectUser, loginUser, logoutUser } = require('../models/users-models');
const {app} = require('../app.js');

// Socket
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(client) {
  
    client.on('disconnect', function() {
      logOutUser(client.id);
    });
  });

const getUsers = (req, res, next) => {
    return selectUsers(req.body)
        .then(users => {
            res.status(200).send({ users });
        })
        .catch(err => {
            next({code: 500, message: `Unhandled error at getUsers: ${err.code} ${err.message}`})
        })
};

const postUser = (req, res, next) => {
    return insertUser(req.body)
        .then(([user]) => {
            res.status(201).send({ user });
        })
        .catch(err => {
            if (err.code === '23505') {
                next({ code: 422, message: 'User already exists!' });
            } else if (err.code === '23502') {
                next({ code: 400, message: 'User information not valid!' });
            } else {
                next(err);
            };
        });
};

const logInUser = (req, res, next) => {
    const {username, password, socket} = req.body;
    return selectUser({username, password})
        .then(([user]) => {
            if (user) return loginUser({username, socket})
            if (!user) throw({ code: 404, message: 'Username or password not valid' });
        })
        .then(([user]) => {
            res.status(200).send({ user });
        })
        .catch(err => {
            if (err.code === '23502') {
                next({ code: 400, message: 'Username or password not valid!' });
            } else {
                next(err);
            };
        });
};

const logOutUser = (req, res, next) => {
    return logoutUser(req.body)
        .then(() => {
            res.status(200).send();
        })
        .catch(err => {
            next(err);
        });
};

module.exports = { getUsers, postUser, logInUser };