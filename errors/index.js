
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

const handle422 = (err, req, res, next) => {
    if (err.code === 422) {
        res.status(422).send({ message: err.message });
    } else {
        next(err);
    };
};

module.exports = { handle400, handle404, handle422 };