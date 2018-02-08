function CustomStatus(name, code, desc) {
    this._status = {
        name: name || "",
        code: code || "",
        desc: desc || ""
    }
}

CustomStatus.prototype.get = function (status) {
    return this._status;
};

CustomStatus.prototype.status = function () {
    return this instanceof CustomStatus;
};

CustomStatus.prototype.name = function (name) {
    this._status.name = name;
};

CustomStatus.prototype.code =  function (code) {
    this._status.code = code;
};

CustomStatus.prototype.desc = function (desc) {
    this._status.desc = desc;
};

module.exports = CustomStatus;