const creds   = require('./config')
const client  = require('twilio')(creds.accountSid, creds.authToken)


exports.message = function (body, from, to) {
  client.messages
    .create(body, from, to)
    .then(message => console.log(message.sid));
}
