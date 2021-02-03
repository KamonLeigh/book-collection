const express = require('express');
const expressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const engine = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override')
const passport = require('passport');
const LocalStraegy = require('passport-local').Strategy
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

const testRouter = require('./routers/health');
const wildCard = require('./routers/wildCard');
const books = require('./routers/books');
const users = require('./routers/users');
const home = require('./routers/home');

const app = express();

require('./db/mongoose');
// middleware logger for node.
app.use(morgan('common'));

// set headers in node app by default client is unable to tell that a node/express is running.

app.use(cookieParser());

app.use(express.json());


app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
 app.use(express.urlencoded({extended: true}))

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));

// prevents client sending script to run in db
app.use(expressMongoSanitize());
app.use(express.json());



// app.set('trust proxy', 1);

app.use(session({
  secret: process.env.sessionSECRET,
  resave: true,
  saveUninitialized: true,
  cookie:{ //secure: true
  }
}))

app.use(helmet());
app.use(flash());

const User = require('./db/models/user');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStraegy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// set view engine to use ejs 

app.use((req, res, next) => {
 
  res.locals.user = req.user;
  res.locals.success = req.flash('msg-success');
  res.locals.error = req.flash('error');
  next()
})


app.use(testRouter);
app.use('/', home)
app.use("/books", books);
app.use('/', users);
app.use(wildCard)


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { message = 'oops something is really, really wrong!!', statusCode = 500 } = err;
  res.status(statusCode).send(message);
});

module.exports = app;
