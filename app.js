const app = require('express')();
const bodyParser = require('body-parser');
const { apiRouter } = require('./routes/api-router');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use('/', (err, req, res, next) => {
    console.log('Error:', err.message);
    res.status(400).send('Error!');
})

module.exports = { app };