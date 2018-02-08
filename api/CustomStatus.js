function CustomStatus(name, code, desc) {
    this.status = {
        name: name || "",
        code: code || "",
        desc: desc || ""
    }
}

CustomStatus.prototype.get = function (status) {
    return this.status;
};

CustomStatus.prototype.status = function () {
    return this instanceof CustomStatus;
}

module.exports = CustomStatus;