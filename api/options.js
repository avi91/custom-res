var options = {
  globals: false, //To create global variables of msg and status
  takeMsgFromStatusDesc: false,
  logError: true,
  logger: null,
  debug: process.env.NODE_ENV !== 'production',
  defaults: {
    successMsg: '',
    errMsg: '',
    errorStatusCode: ''
  },
  responses: null
};

function createOptions(opts) {
  opts = opts || {};
  Object.assign(options, opts);

  if(options.globals) {
    if(!options.responses){
      throw new Error('global:true option given, but responses not given.')
    }
    else{
      if (!opts.responses.msg || !opts.responses.status) {
        throw new Error('Responses must export msg and status object');
      }
    }

    global.msg = options.responses.msg;
    global.status = options.responses.status;
  }
  return options;
}

module.exports = {
  createOptions: createOptions,
  opts: options
};
