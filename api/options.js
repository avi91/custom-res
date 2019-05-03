var options = {
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

  return options;
}

module.exports = {
  createOptions: createOptions,
  opts: options
};
