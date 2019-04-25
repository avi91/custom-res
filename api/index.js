var api = require('./api');
var options = require('./options');

function init(opts) {
  options.createOptions(opts);
  function middleware(req, res, next) {
    res.create = api.create;
    res.err = api.err;
    res.customRes = api;
    res.createCustomError = api.createCustomError;
    res.createResponse = api.createResponse;
    res.castData = api.castData;
    res.castErr = api.castErr;
    res.castDataNSend = function (data) {
      return api.castDataNSend(data, res)
    };
    res.castErrNSend = function (data) {
      return api.castErrNSend(data, res);
    };

    if(options.opts.responses){
      res.responses = options.opts.responses;

      if(options.opts.responses.msg){
        res.msg = options.opts.responses.msg;
      }

      if(options.opts.responses.status){
        res.customStatus = options.opts.responses.status;
      }
    }

    next();
  }

  return {
    api: api,
    middleware: middleware
  }
}

module.exports = init;
