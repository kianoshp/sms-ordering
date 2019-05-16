var express = require('express');
var router = express.Router();
const users = require('../controllers/users');

/* GET users listing. */
router.route('/all')
  .get(users.getAllUsers);

/**
 * get user based on email
 */
router.route('/userByEmail')
  .get(users.getUserByEmail);

/**
 * get user based on id
 */
router.route('/userById')
  .get(users.getUserById);

/**
 * Create new user
 */
router.route('/user')
  .post(users.createUser);

/**
 * Update user based on id
 * 
 * reqest body should have all elements of a user
 * except for password (id, email, phone, first_name, last_name)
 */
router.route('/userInfoUpdate')
  .put(users.updateUserInfo);

router.route('/userDelete')
  .delete(users.deleteUser);

router.route('/userByPassword')
  .post(users.getUserByPassword);

module.exports = router;
