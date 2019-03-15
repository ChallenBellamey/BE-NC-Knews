const usersRouter = require('express').Router();
const { getUsers, postUser, getUser } = require('../controllers/users-controllers');

usersRouter.route('/')
    .get(getUsers)
    .post(postUser)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

usersRouter.route('/:username')
    .get(getUser)
    .all((res, req, next) => {
        next({ code: 405, message: 'Method not allowed '});
    })

module.exports = { usersRouter };