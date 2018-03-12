var _helpers = require('./utils');

function Response(arg1, arg2){
    this._httpCode = 200;
    this._success = true;
    this._message = "";
    this._status = {};

    if(typeof arg1 !== 'undefined') {
        if(arg1 instanceof Response){
            this._httpCode = arg1._httpCode;
            this._message = arg1._message;
            this._status = arg1._status;
            this._success = arg1._success;
            if(arg1._data)
                this._data = arg1._data;
        }
        else if (_helpers.isMessage(arg1))
            this._message = arg1.get();
        else if(typeof arg1 === 'string')
            this._message = arg1;
        else if(_helpers.isCustomStatus(arg1))
            this._status = arg1.get();
        else if(typeof arg1 === 'object'){
            this._success = arg1.success || true;
            if(arg1.message) {
                this._message = _helpers.createMessage(arg1.message).get();
            }
            if(arg1.status) {
                this._status = _helpers.createCustomStatus(arg1.status).get();
            }
            if(arg1.data)
                this._data = arg1.data;
        }
        else
            throw new Error('Arguments must be of Message/CustomStatus/Response/string type.')
    }

    if(typeof arg2 !== 'undefined'){
        if(arg1 instanceof Response){
            if(arg2 instanceof Response)
                throw new Error("Can't take two Response object as parameters");
            if (_helpers.isMessage(arg2))
                this._message = arg2.get();
            else if(typeof arg2 === 'string')
                this._message = arg2;
            else if(_helpers.isCustomStatus(arg2))
                this._status = arg2.get();
            else
                throw new Error('Arguments must be of Message/CustomStatus/Response/string type.')
        }
        else if(typeof arg1 === 'object'){
            if(arg2 instanceof Response)
                throw new Error("Can't take two Response object as parameters");
            if (_helpers.isMessage(arg2))
                this._message = arg2.get();
            else if(typeof arg2 === 'string')
                this._message = arg2;
            else if(_helpers.isCustomStatus(arg2))
                this._status = arg2.get();
            else
                throw new Error('Arguments must be of Message/CustomStatus/Response/string type.')
        }
        else{
            if(this._message === ''){
                if (_helpers.isMessage(arg2))
                    this._message = arg2.get();
                else if(typeof arg2 === 'string')
                    this._message = arg2;
            }
            if(_helpers.isCustomStatus(arg2))
                this._status = arg2.get();
        }
    }
}

Response.prototype.get = function () {
    var response = {
        success: this._success,
        message: this._message,
        status: this._status
    };
    if(this._data)
        response.data = this._data;

    return response;
};

Response.prototype.isResponse = function () {
    return this instanceof Response;
};

Response.prototype.set = function (arg) {
    if(_helpers.isMessage(arg) || typeof arg === 'string')
        return this.message(arg);
    else if(_helpers.isCustomStatus(arg))
        return this.status(arg);
    else if(Number.isInteger(arg))
        return this.httpCode(arg);
    else if(typeof arg === 'boolean')
        return this.success(arg);
    else
        throw new Error('Arguments must be of Message/CustomStatus/Response/string/Boolean/Integer type.')

};

//Setters
Response.prototype.httpCode = function (httpCode) {
    if(Number.isInteger(httpCode) && httpCode >= 100 && httpCode <=600)
        this._httpCode = httpCode;
    else
        throw new Error('Invalid http status code');

    return this;

};

Response.prototype.success = function (success) {
    this._success = success;
    return this;
};

Response.prototype.message = function (msg) {
    if(_helpers.isMessage(msg))
        this._message = msg.get();
    else if(typeof msg === 'string')
        this._message = msg;
    else
        throw new Error('Message can only be of Message type or String.')
    
    return this;
};

Response.prototype.msg = function (msg) {
    return this.message(msg);
};

Response.prototype.status = function (status) {
    if(_helpers.isCustomStatus(status))
        this._status = status.get();
    else
        throw new Error('Status is not CustomStatus type.');
    
    return this;
};

Response.prototype.data = function (data) {
    this._data = data;
    return this;
};

Response.prototype.getErr = function () {
    return this._err;
}

//Getters

Response.prototype.getHttpCode = function () {
    return this._httpCode;
};
Response.prototype.getMessage = function () {
    return this._message;
};
Response.prototype.getStatus = function () {
    return this._status;
};

//Instance Check
Response.prototype.isResponse = function () {
    return this instanceof Response;
}

//Send function
Response.prototype.send = function (res) {
    if(typeof res === 'undefined')
        throw 'express res object is not passed to send.';
    var response = this.get();
    if(!this._data)
        response.data = "";
    res.status(this._httpCode).send(this.get());
};

module.exports = Response;