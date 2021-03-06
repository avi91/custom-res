var CustomError = require('./CustomError');
var Response = require('./Response');
var CustomStatus = require('./CustomStatus');
var Message = require('./Message');
var opts = require('./options').opts;
var api = {
    Response: Response,
    CustomError: CustomError,
    Message: Message,
    CustomStatus: CustomStatus,
    options: opts,
    responses: opts.responses,
    create: function (msg, status) {
        return new Response(msg, status);
    },
    err: function (msg, status) {
        return new CustomError(msg, status);
    },
    createCustomError: function (msg, status) {
        return new CustomError(msg, status);
    },
    createResponse: function (msg, status) {
        return new Response(msg, status);
    },
    createMessage: function (msg) {
        return new Message(msg);
    },
    createCustomStatus: function (name, code, desc) {
        return new CustomStatus(...arguments);
    },
    isCustomError: function (error) {
        return (error instanceof CustomError);
    },
    isResponse: function (obj) {
        return (obj instanceof Response);
    },
    isMessage: function (msg) {
        return (msg instanceof Message)
    },
    isCustomStatus: function (status) {
        return (status instanceof CustomStatus);
    },
    castData: function (data) {
        if(api.isResponse(data))
            return data;

        return new Response().data(data);
    },
    castDataNSend: function (data, res) {
       api.castData(data).send(res);
    },
    castErr: function (err) {
        if(api.isResponse(err))
        {
            if(api.isCustomError(err))
                return err;
            else
                return new CustomError(err);
        }

        var msg;
        var response = new CustomError();
        if(typeof err === 'string')
            msg = err;
        else if(err instanceof Error){
            if(err.name === 'StatusCodeError' && err.error){
                var _customErr = new CustomError(err.error);
                if(err.statusCode)
                    _customErr.httpCode(err.statusCode);

                return _customErr;
            }
            msg = err.message;
            response._error = err.stack;
        }
        else if(typeof err === 'object'){
            return new CustomError(err);
        }
        else{
            msg = opts.defaults ? opts.defaults.errMsg || 'Something went wrong' : 'Something went wrong';
            response._error = err;
        }
        return response.message(msg);
    },
    castErrNSend: function (err, res) {
        api.castErr(err).send(res);
    }
};

module.exports = api;
