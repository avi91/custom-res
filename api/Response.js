var _helpers = require('./utils');

function Response(arg1, arg2){
    this.httpCode = 200;
    this.success = true;
    this.message = "";
    this.status = {};

    if(typeof arg1 !== 'undefined') {
        if(arg1 instanceof Response){
            this.httpCode = arg1.httpCode;
            this.message = arg1.message;
            this.status = arg1.status;
            this.success = arg1.success;
            if(arg1.data)
                this.data = arg1.data;
        }
        else if (_helpers.isMessage(arg1))
            this.message = arg1.get();
        else if(typeof arg1 === 'string')
            this.message = arg1;
        else if(_helpers.isCustomStatus(arg1))
            this.status = arg1.get();
        else
            throw new Error('Arguments must be of Message/CustomStatus/Response/string type.')
    }

    if(typeof arg2 !== 'undefined'){
        if(arg1 instanceof Response){
            if (_helpers.isMessage(arg2))
                this.message = arg2.get();
            else if(typeof arg2 === 'string')
                this.message = arg2;
            else if(_helpers.isCustomStatus(arg2))
                this.status = arg2.get();
            else
                throw new Error('Arguments must be of Message/CustomStatus/Response/string type.')
        }
        else{
            if(this.message === ''){
                if (_helpers.isMessage(arg2))
                    this.message = arg2.get();
                else if(typeof arg2 === 'string')
                    this.message = arg2;
            }
            if(_helpers.isCustomStatus(arg2))
                this.status = arg2.get();
        }
    }
}

Response.prototype.get = function () {
    var response = {
        success: this.success,
        message: this.message,
        status: this.status
    };
    if(this.data)
        response.data = this.data;

    return response;
};

Response.prototype.isResponse = function () {
    return this instanceof Response;
};

//Setters
Response.prototype.setHttpCode = function (httpCode) {
    if(Number.isInteger(httpCode) && httpCode >= 100 && httpCode <=600)
        this.httpCode = httpCode;
    else
        throw new Error('Invalid http status code');
    
    return this;

};

Response.prototype.set = function (arg) {
    if(_helpers.isMessage(arg) || typeof arg === 'string')
        return this.setMessage(arg);
    else if(_helpers.isCustomStatus(arg))
        return this.setStatus(arg);
    else if(Number.isInteger(arg))
        return this.setHttpCode(arg);
    else if(typeof arg === 'boolean')
        return this.setSuccess(arg);
    else
        throw new Error('Arguments must be of Message/CustomStatus/Response/string/Boolean/Integer type.')

};

Response.prototype.setSuccess = function (success) {
    this.success = success;
    return this;
};

Response.prototype.setMessage = function (msg) {
    if(_helpers.isMessage(msg))
        this.message = msg.get();
    else if(typeof msg === 'string')
        this.message = msg;
    else
        throw new Error('Message can only be of Message type or String.')
    
    return this;
};

Response.prototype.setStatus = function (status) {
    if(_helpers.isCustomStatus(status))
        this.status = status.get();
    else
        throw new Error('Status is not CustomStatus type.');
    
    return this;
};

Response.prototype.setData = function (data) {
    this.data = data;
    return this;
};

//Getters

Response.prototype.getHttpCode = function () {
    return this.httpCode;
};
Response.prototype.getMessage = function () {
    return this.message;
};
Response.prototype.getStatus = function () {
    return this.status;
};

//Instance Check
Response.prototype.isResponse = function () {
    return this instanceof Response;
}

//Send function
Response.prototype.send = function (res) {
    var response = this.get();
    response.data = "";
    return response;
    // res.status(this.httpCode).send(this.get());
};

module.exports = Response;