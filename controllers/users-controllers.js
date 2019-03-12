const { selectAllUsers, insertUser } = require('../models/users-models');

const getUsers = (req, res, next) => {
    return selectAllUsers()
        .then(users => {
            res.status(200).send({ users })
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
}

module.exports = { getUsers, postUser };