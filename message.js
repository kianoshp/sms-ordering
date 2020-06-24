const creds   = require('./config')
const client  = require('twilio')(creds.accountSid, creds.authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse


module.exports.sendSms = function (to, message) {
  return client.api.messages
    .create({
      body: message, 
      to: to,
      from: creds.From
    })
    .then((data) => {
      console.log('message sent')
    })
    .catch((err) => {
      console.error('could not send message'); 
      console.error(err);
    })
}

module.exports.receiveSms = function (app) {
  app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  })
}
