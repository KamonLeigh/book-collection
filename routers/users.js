const express = require('express');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const passport = require('passport')
const { register, registerUser, login, loginUser, logoutUser } = require('../controllers/users');

const router = new express.Router();

router.get('/register', register)
      .post('/register', registerUser)
      .get('/login', login)
      .post('/login',passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}) ,loginUser)
      .get('/logout', logoutUser)

module.exports = router;