var CustomError = require('./CustomError');
var Response = require('./Response');
var CustomStatus = require('./CustomStatus');
var Message = require('./Message');

var api = {
    Response: Response,
    CustomError: CustomError,
    Message: Message,
    CustomStatus: CustomStatus,
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
        var response = new Response().data(data);
        return response;
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
        else if(err instanceof Error)
            msg = err.message || err.msg;
        else{
            msg = 'Something went wrong';
            response._err = err;
        }
        return response.message(msg);
    },
    castErrNSend: function (err, res) {
        api.castErr(err).send(res);
    }
};

module.exports = api;