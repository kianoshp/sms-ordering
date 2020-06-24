const dbClient  = require('mongodb').MongoClient
const url       = 'mongodb://localhost/FavoritesDB'

module.exports.connect = function() {
  return dbClient.connect(url, function(err,db) {
    console.log('Connected');
    db.close();
  })
};
