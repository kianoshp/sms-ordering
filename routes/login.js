const db = require('../bin/www');

const findByUsernamePassword = (email, password, next) => {
  console.log('I am here', email, password);
  db.query(`SELECT * from users where password=crypt('${password}', password) and email='${email}'`, 
  (error, result) => {
    console.log('result', result);
    if (error) return next(error);

    if(result.rows.length === 0) return next(null, false);

    return next(null, result.rows);
  });
};

module.exports.loginUser = findByUsernamePassword;