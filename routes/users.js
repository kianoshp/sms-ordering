var express = require('express');
var router = express.Router();
var db = require('../bin/db');

/* GET users listing. */
router.get('/all', function(req, res, next) {
  db.query('SELECT * from users ORDER BY id ASC;', (error, results) => {
    if (error) {
      throw error;
    }

    res.json(results.rows);
  });
});

/**
 * get user based on email
 */
router.get('/user', (req, res, next) => {
  db.query(`SELECT * from users where email='${req.query.email}' ORDER BY last_name ASC`, (error, result) => {
    if (error) {
      throw error;
    }

    res.json(result.rows);
  });
});

/**
 * get user based on id
 */
router.get('/user', (req, res, next) => {
  db.query(`SELECT * from users where id='${req.query.id}'`, (error, result) => {
    if (error) {
      throw error;
    }

    res.json(result.rows);
  });
});

/**
 * Create new user
 */
router.post('/user', (req, res, next) => {
  const {email, phone, password, first_name, last_name} = req.body;
  console.log('I am about to add ' + email + ' ' + password + ' ' + phone + ' ' + first_name + ' ' + last_name);

  db.query(`INSERT INTO users (email, phone, password, first_name, last_name) 
    VALUES('${email}', '${phone}', crypt('${password}', gen_salt('md5')), '${first_name}', '${last_name}') 
    RETURNING id`,
    (error, results) => {
      if (error) {
        if (error.code === '23505') {
          res.status(500).send({'error': error.detail, 'constraint': error.constraint});
          throw error;
        } else {
          throw error;
        }
      }

      res.send('New user has been added with the id of ' + results.rows[0].id);
    });
});

/**
 * Update user based on id
 * 
 * reqest body should have all elements of a user
 * except for password (id, email, phone, first_name, last_name)
 */
router.put('/user', (req,res,next) => {
  const {id, email, phone, first_name, last_name} = req.body;

  db.query(`UPDATE users set email='${email}',  
  phone='${phone}',
  first_name='${first_name}',
  last_name='${last_name}' 
  where id='${id}' RETURNING id, first_name, last_name`, (error, results) => {
    if(error) {
      throw error;
    }

    res.send('updated the user info for user ' + results.rows[0].first_name + ' ' + results.rows[0].last_name);
  })
});

module.exports = router;
