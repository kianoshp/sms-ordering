// content of app.js
const http        = require('http')
const port        = 3000
const app         = require('express')()
const message     = require('./message')
const dbConnect   = require('./db')
// const dbClient  = require('mongodb').MongoClient
// const url       = 'mongodb://localhost/FavoritesDB'

message.sendSms(
  '17819623739',
  'this is a test message'
  )

message.receiveSms(app)

dbConnect.connect();


// dbClient.connect(url, function(err,db) {
//   console.log('Connected');
//   db.close();
// });

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`Express server is listening on ${port}`)
})