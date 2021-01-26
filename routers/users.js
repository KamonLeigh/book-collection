const express = require('express');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const { register, registerUser } = require('../controllers/users');

const router = new express.Router();

router.get('/register', register)
      .post('/register', registerUser)

module.exports = router;