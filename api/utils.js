var CustomStatus = require('./CustomStatus');
var Message = require('./Message');

var utils = {
    isMessage: function (msg) {
        return (msg instanceof Message)
    },
    isCustomStatus: function (status) {
        return (status instanceof CustomStatus);
    }
};

module.exports = utils;