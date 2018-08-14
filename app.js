// content of app.js
const http        = require('http')
const port        = 3000
const app         = require('express')()
const creds       = require('./config')
const client      = require('twilio')(creds.accountSid, creds.authToken)
const sendMessage = require('./send').message
const MessagingResponse = require('twilio').twiml.MessagingResponse
const dbConnect         = require('./db')
const dbClient  = require('mongodb').MongoClient
const url       = 'mongodb://localhost/FavoritesDB'

// sendMessage('This is the ship that made the Kessel Run in fourteen parsecs?', creds.From, creds.To).done();

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
})

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: creds.From,
     to: creds.To
   })
  .then(message => console.log(message.sid))
  .done();

// dbConnect.connect();


dbClient.connect(url, function(err,db) {
  console.log('Connected');
  db.close();
});

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`Express server is listening on ${port}`)
})