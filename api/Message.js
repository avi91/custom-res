function Message(msg) {
    if(typeof msg !== 'string')
        throw new Error('Message must be of string type.');

    this._message = msg || "";
}

Message.prototype.get = function () {
    return this._message;
};

Message.prototype.isMessage = function () {
    return this instanceof Message;
};

Message.prototype.message = function (msg) {
    this._message = msg;
    return this;
}

module.exports = Message;
