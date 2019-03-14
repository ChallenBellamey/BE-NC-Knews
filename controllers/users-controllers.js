const { selectUsers, insertUser, selectUser } = require('../models/users-models');

const getUsers = (req, res, next) => {
    return selectUsers()
        .then(users => {
            res.status(200).send({ users });
        })
        .catch(err => {
            next({code: 500, message: 'Unhandled error at getUsers'})
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

const getUser = (req, res, next) => {
    return selectUser(req.params.username)
        .then(([user]) => {
            if (user === undefined) {
                throw({ code: 404, message: 'User not found!' })
            } else {
                res.status(200).send({ user });
            };  
        })
        .catch(next);
};

module.exports = { getUsers, postUser, getUser };