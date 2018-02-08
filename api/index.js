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
        return (obj instanceof ResObj);
    },
    isMessage: function (msg) {
        return (msg instanceof Message)
    },
    isCustomStatus: function (status) {
        return (status instanceof CustomStatus);
    }
};

module.exports = api;