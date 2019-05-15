const Pool = require('pg').Pool;

let dbOptions = {};

if (process.env.NODE_ENV === 'development') {
  dbOptions = {
    host     : '127.0.0.1',
    database : 'mydb',
    user     : 'kianosh',
    password : 'micielo69',
    port     : '5432'
  };  
}
const pool = new Pool(dbOptions);

pool.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

// pool.end();

module.exports = pool;