
const handle400 = (err, req, res, next) => {
    if (err.code === 400) {
        res.status(400).send({ message: err.message });
    } else {
        next(err);
    };
};

const handle404 = (err, req, res, next) => {
    if (err.code === 404) {
        res.status(404).send({ message: err.message });
    } else {
        next(err);
    };
};

const handle405 = (err, req, res, next) => {
    if (err.code === 405) {
        res.status(405).send({ message: err.message });
    } else {
        next(err);
    };
};

const handle422 = (err, req, res, next) => {
    if (err.code === 422) {
        res.status(422).send({ message: err.message });
    } else {
        next(err);
    };
};

const handle500 = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).send({ message: err.message });
};

module.exports = { handle400, handle404, handle405, handle422, handle500 };