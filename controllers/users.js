var db = require('../bin/db');

const users = {
  createUser: (req, res, next) => {
    const {email, phone, password, first_name, last_name} = req.body;
    console.log('I am about to add ' + email + ' ' + password + ' ' + phone + ' ' + first_name + ' ' + last_name);
  
    db.query(`INSERT INTO users (email, phone, password, first_name, last_name) 
      VALUES('${email}', '${phone}', crypt('${password}', gen_salt('md5')), '${first_name}', '${last_name}') 
      RETURNING id`,
      (error, results) => {
        if (error) {
          if (error.code === '23505') {
            res.status(500).send({'error': error.detail, 'constraint': error.constraint});
            next(error);
          } else {
            next(error);
          }
        }
  
        res.send('New user has been added with the id of ' + results.rows[0].id);
      }
    );  
  },
  updateUserInfo: (req, res, next) => {
    const {id, email, phone, first_name, last_name} = req.body;
    console.log('I am here');
    db.query(`UPDATE users set email='${email}',  
    phone='${phone}',
    first_name='${first_name}',
    last_name='${last_name}' 
    where id='${id}' RETURNING id, first_name, last_name`, (error, results) => {
      if(error) {
        next(error);
      }
  
      res.send('updated the user info for user ' + results.rows[0].first_name + ' ' + results.rows[0].last_name);
    });  
  },
  getAllUsers: (req, res, next) => {
    db.query('SELECT * from users ORDER BY id ASC;', (error, results) => {
      if (error) {
        next(error);
      }
  
      res.json(results.rows);
    });  
  },
  getUserById: (req, res, next) => {
    db.query(`SELECT * from users where id='${req.query.id}'`, (error, result) => {
      if (error) {
        next(error);
      }
  
      res.json(result.rows);
    });
  },
  getUserByEmail: (req, res, next) => {
    db.query(`SELECT * from users where email='${req.query.email}' ORDER BY last_name ASC`, (error, result) => {
      if (error) {
        next(error);
      }
  
      res.json(result.rows);
    });  
  },
  deleteUser: (req, res, next) => {
    db.query(`DELETE from users where id='${req.body.id}'`, (error, results) => {
      if(error) next(error);

      console.log('results', results);
      res.json(req.body.id);
    })
  },
  getUserByPassword: (req, res, next) => {
    db.query(`SELECT * from users where password=crypt('${req.body.password}', password)`, (error, result) => {
      if (error) {
        next(error);
      }
  
      res.json(result.rows);
    });
  },
  updateUserPassword: (req, res, next) => {

  }
}

module.exports = users;