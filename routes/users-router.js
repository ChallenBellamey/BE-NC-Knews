const usersRouter = require('express').Router();
const { getUsers, postUser, logUser } = require('../controllers/users-controllers');

usersRouter.route('/')
    .get(getUsers)
    .post(postUser)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

usersRouter.route('/:username')
    .post(logUser)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

module.exports = { usersRouter };