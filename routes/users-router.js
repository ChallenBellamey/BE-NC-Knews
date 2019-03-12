const usersRouter = require('express').Router();
const { getUsers, postUser } = require('../controllers/users-controllers');

usersRouter.route('/')
    .get(getUsers)
    .post(postUser);

module.exports = { usersRouter };