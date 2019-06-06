const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

passport.use(new Strategy((email, password, cb) => {
  console.warn('I am in passport', email, password);
  const loginReturn = loginRouter.loginUser(email, password, next);
  console.warn(loginReturn);
  return cb(false, false);
}));

passport.serializeUser(function(user, cb) {
  console.log('user', user);
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.query(`SELECT * from users where id='${id}'`, 
  (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

const app = express();

const sessionOpts = {
  secret: '1-click-oredring',
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sessionOpts.cookie.secure = true;
}
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionOpts));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
