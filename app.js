const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const { apiRouter } = require('./routes/api-router');
const { handle400, handle404, handle405, handle422, handle500 } = require('./errors')

app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use('/*', handle400);
app.use('/*', handle404);
app.use('/*', handle405);
app.use('/*', handle422);
app.use('/*', handle500);

module.exports = { app };