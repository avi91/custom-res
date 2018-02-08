function Message(msg) {
    this.message = msg || "";
}

Message.prototype.get = function () {
    return this.message;
};

Message.prototype.isMessage = function () {
    return this instanceof Message;
};

module.exports = Message;
