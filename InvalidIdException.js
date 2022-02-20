class InvalidIdException {
    constructor() {
        this.status = 400;
        this.message = "Invalid ID";
    }
}

module.exports = InvalidIdException;