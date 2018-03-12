var CustomStatus = require('./CustomStatus');
var Message = require('./Message');

var utils = {
    isMessage: function (msg) {
        return (msg instanceof Message)
    },
    isCustomStatus: function (status) {
        return (status instanceof CustomStatus);
    },
    createCustomStatus: function (name, code, desc) {
        return new CustomStatus(...arguments);
    },
    createMessage: function (msg) {
        return new Message(msg);
    }
};

module.exports = utils;