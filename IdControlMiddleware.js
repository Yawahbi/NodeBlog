const InvalidIdException = require('./InvalidIdException');

const IdControl = (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (Number.isNaN(id)) {
        next(new InvalidIdException());
    }
    next();
}

module.exports = IdControl;