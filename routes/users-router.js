const usersRouter = require('express').Router();
const { getUsers, postUser, getUser } = require('../controllers/users-controllers');

usersRouter.route('/')
    .get(getUsers)
    .post(postUser);

usersRouter.route('/:username')
    .get(getUser)

module.exports = { usersRouter };