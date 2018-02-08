var CustomStatus = require('./CustomStatus');
var Message = require('./Message');

var utils = {
    Message: Message,
    CustomStatus: CustomStatus,
    createMessage: function (msg) {
        return new Message(msg);
    },
    createCustomStatus: function (name, code, desc) {
        return new CustomStatus(...arguments);
    },
    isMessage: function (msg) {
        return (msg instanceof Message)
    },
    isCustomStatus: function (status) {
        return (status instanceof CustomStatus);
    }
};

module.exports = utils;