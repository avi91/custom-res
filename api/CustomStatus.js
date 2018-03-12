function CustomStatus(name, code, desc) {
    if(arguments.length === 1){
        var obj = arguments[0];
        if(obj instanceof CustomStatus){
            return obj;
        }
        else if(typeof obj === 'object'){
            return new CustomStatus(obj.name, obj.code, obj.desc);
        }
        else if(typeof obj === 'string')
            return new CustomStatus('','', obj);
    }
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