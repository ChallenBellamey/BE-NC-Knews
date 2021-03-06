const { selectUsers, insertUser, selectUser, loginUser, logoutUser } = require('../models/users-models');

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

const logUser = (req, res, next) => {
    if (req.body.log === 'In') {
        logInUser(req, res, next);
    } else if (req.body.log === 'Out') {
        logOutUser(req, res, next);
    };
};

const logInUser = (req, res, next) => {
    return loginUser(req.body)
        .then(([user]) => {
            if (user) res.status(200).send({ user });
            throw({code: 23502});
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

module.exports = { getUsers, postUser, logUser };