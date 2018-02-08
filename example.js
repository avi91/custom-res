var CustomRes = require('./');
// console.log(CustomRes);
var msg = CustomRes.createMessage('first message');
var status = CustomRes.createCustomStatus('first status', 1000, 'first desc');
var status2 = CustomRes.createCustomStatus('second status', 2002, 'second desc');
var msg2 = CustomRes.createMessage('new message')
var response = CustomRes.createResponse().httpCode(303).message(msg).success(false).status(status2).set(status);
var err = CustomRes.createCustomError(response).message(msg2)
var err2 = CustomRes.castErr('This is error');
var err3 = CustomRes.castErr(new Error('error type')).get();
var err4 = CustomRes.castErr(status2)

console.log(err, err2, err3, err4);