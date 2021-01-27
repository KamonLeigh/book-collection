const express = require('express');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const { register, registerUser, login, loginUser } = require('../controllers/users');

const router = new express.Router();

router.get('/register', register)
      .post('/register', registerUser)
      .get('/login', login)
      .post('/login', loginUser)

module.exports = router;