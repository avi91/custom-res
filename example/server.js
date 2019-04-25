var express = require('express');
var app = express();
var customRes = require('../')({
  globals: true,
  defaults: {
    successMsg: 'Default Success Msg',
    errMsg: 'Default Err Msg'
  },
  logError: false,
  responses: {
    msg: {},
    status: {}
  }
});
app.use(customRes.middleware);
var port = 3000

app.get('/', (req, res) => {
  res.castErrNSend(new Error('random'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
