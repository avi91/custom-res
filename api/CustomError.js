var Response = require('./Response');
var options = require('./options').opts;

function CustomError(msg, status) {
    Response.call(this,...arguments);
    this._success = false;
    this._httpCode = options.defaults ? options.defaults.errorStatusCode || 400 : 400;
}

CustomError.prototype = Object.create(Response.prototype);
CustomError.prototype.constructor = CustomError;

CustomError.prototype.isCustomError = function () {
    return this instanceof CustomError;
};

CustomError.prototype.send = function (res) {
    if(typeof res === 'undefined')
        throw 'express res object is not passed to send.';

    if (!this._message && options.takeMsgFromStatusDesc && this._status.desc)
        this._message = this._status.desc;

    if (!this._message && options.defaults.errMsg)
        this._message = options.defaults.errMsg;

    res.status(this._httpCode).send(this.get());
};

module.exports = CustomError;
