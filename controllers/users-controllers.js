const { selectUsers, insertUser, selectUser } = require('../models/users-models');

const getUsers = (req, res, next) => {
    return selectUsers()
        .then(users => {
            res.status(200).send({ users });
        })
        .catch(err => {
            next(err);
        })
};

const postUser = (req, res, next) => {
    return insertUser(req.body)
        .then(([user]) => {
            res.status(201).send({ user });
        })
        .catch(err => {
            next(err);
        })
};

const getUser = (req, res, next) => {
    return selectUser(req.params.username)
        .then(([user]) => {
            res.status(200).send({ user });
        })
};

module.exports = { getUsers, postUser, getUser };