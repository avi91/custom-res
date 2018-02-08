var CustomRes = require('./');
// console.log(CustomRes);
var msg = CustomRes.createMessage('first message');
var status = CustomRes.createCustomStatus('first status', 1000, 'first desc');
var status2 = CustomRes.createCustomStatus('second status', 2002, 'second desc');
var msg2 = CustomRes.createMessage('new message')
var response = CustomRes.createResponse().httpCode(303).message(msg).success(false).status(status2).set(status);
var err = CustomRes.createCustomError(response).message(msg2)

console.log(response.send());

console.log(err.send());
