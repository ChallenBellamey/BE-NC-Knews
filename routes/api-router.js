const apiRouter = require('express').Router();

apiRouter.route('/')
    .get((req, res, next) => {
        res.send({});
    });

module.exports = { apiRouter };