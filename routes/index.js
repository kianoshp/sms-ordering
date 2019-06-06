var express = require('express');
var router = express.Router();
const passport = require('passport');

console.log('passport', passport);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', 
  (passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    console.log('I am in index post');
    console.log(req.user);
    console.log(res.user);
    // res.redirect('/');
    res.json('I have logged in succesfully');
  })
);

module.exports = router;
