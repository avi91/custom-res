var CustomRes = require('./');
// console.log(CustomRes);
var msg = CustomRes.createMessage('first message');
var status = CustomRes.createCustomStatus('first status', 1000, 'first desc');
var status2 = CustomRes.createCustomStatus('second status', 2002, 'second desc');
var msg2 = CustomRes.createMessage('new message')
var response = CustomRes.createResponse();
console.log(response);


var err = CustomRes.createCustomError(response)
