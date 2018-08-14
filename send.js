const creds   = require('./config')
const client  = require('twilio')(creds.accountSid, creds.authToken)


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
