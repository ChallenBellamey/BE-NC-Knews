const app = require('express')();
const bodyParser = require('body-parser');
const { apiRouter } = require('./routes/api-router');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use('/', (err, req, res, next) => {
    console.log(err.message);
})

module.exports = { app };