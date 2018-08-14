const dbClient  = require('mongodb').MongoClient
const url       = 'mongodb://localhost/FavoritesDB'

var connection = function connect() {
  return dbClient.connect(url, function(err,db) {
    console.log('Connected');
    db.close();
  })
};

module.exports = connection;