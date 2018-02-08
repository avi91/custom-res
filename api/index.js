var CustomError = require('./CustomError');
var Response = require('./Response');
var utils = require('./utils');

var api = {
    Response: Response,
    CustomError: CustomError,
    Message: utils.Message,
    CustomStatus: utils.CustomStatus,
    createCustomError: function (msg, status) {
        return new CustomError(msg, status);
    },
    createResponse: function (msg, status) {
        return new Response(msg, status);
    },
    createMessage: utils.createMessage,
    createCustomStatus: utils.createCustomStatus,
    isCustomError: function (error) {
        return (error instanceof CustomError);
    },
    isResponse: function (obj) {
        return (obj instanceof ResObj);
    },
    isMessage: utils.isMessage,

};

module.exports = api;