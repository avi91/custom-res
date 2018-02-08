var Response = require('./Response');

function CustomError(msg, status) {
    Response.call(this,...arguments);
    this.success = false;
    this.httpCode = 400;
}

CustomError.prototype = Object.create(Response.prototype);
CustomError.prototype.constructor = CustomError;

CustomError.prototype.isCustomError = function () {
    return this instanceof CustomError;
};

CustomError.prototype.send = function (res) {
    var response = this.get();
    return response;

    // res.status(this.httpCode).send(this.get());
};

module.exports = CustomError;