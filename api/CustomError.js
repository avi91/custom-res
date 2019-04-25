var Response = require('./Response');
var options = require('./options').opts;

function CustomError(arg1, arg2) {
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

    if(!this._error)
        this.error = "";

    if(options.logError)
        if (options.logger){
            options.logger('Logging Error from custom-res module (next line):')
            options.logger(this.getError())
        }
        else {
            console.error('Logging Error from custom-res module (next line):')
            console.error(this.getError());
        }

    var response = this.get();

    res.status(this._httpCode).send(response);
};

module.exports = CustomError;
