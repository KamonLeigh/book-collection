const express = require('express');
const passport = require('passport');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const {
  register, registerUser, login, loginUser, logoutUser, user: getUser, forgotPw, postForgotPw,
} = require('../controllers/users');
const { isLoggedIn, validateUser } = require('../middleware');

const router = new express.Router();

router.get('/register', register)
  .post('/register', validateUser, registerUser)
  .get('/login', login)
  .post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), loginUser)
  .get('/logout', logoutUser)
  .get('/me', isLoggedIn, asyncErrorHandler(getUser))
  .get('/forgot', forgotPw)
  .post('/forgot', asyncErrorHandler(postForgotPw));

module.exports = router;
