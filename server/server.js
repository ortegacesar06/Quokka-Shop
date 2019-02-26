const express = require('express');
const logger = require('morgan');
const errors = require('http-errors');
const cookie = require('cookie-parser');
const { join } = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const cors = require('cors');

// SETTINGS ***********************
const app = express();
const  db  = require('./database');

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
next();
});*/

const AuthController = require('./controllers/auth.controller');
passport.use(new LocalStrategy(AuthController.getSession));

// MIDDLEWARES ***********************
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(session({
  name: 'example',
  secret: 'shuush',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    expires: 86400000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use(express.static(join(process.cwd(), 'public')));
app.use(cors({origin: [
  "http://localhost:4200"
], credentials: true}))

// ROUTES ***********************
app.use('/api/role', require('./routes/role.routes'));
app.use('/api/person', require('./routes/person.routes'));
app.use('/api/account', require('./routes/account.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/api/company', require('./routes/company.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/tax', require('./routes/tax.routes'));
app.use('/api/product', require('./routes/product.routes'));
app.use('/api/promotion', require('./routes/promotion.routes'));
app.use('/api/cart', require('./routes/cart.routes'));

// SERVER SETTINGS 
app.use(function(req, res, next) {
  next(errors(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send(err.message);
});

module.exports = app;