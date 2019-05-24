var express = require('express');
var app = express();
var customRes = require('../')({
  defaults: {
    successMsg: 'Default Success Msg',
    errMsg: 'Default Err Msg'
  },
  logError: true,
  debug: true,
  responses: {
    msg: {},
    status: {}
  }
});
app.use(customRes.middleware);
var port = 3000

app.get('/', (req, res) => {
  const response = res.create('Msg');
  console.log(response);
  res.castErrNSend(new Error('error'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
