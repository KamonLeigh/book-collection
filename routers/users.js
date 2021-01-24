const express = require('express');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const { register } = require('../controllers/users');

const router = new express.Router();

router.get('/', register);

module.exports = router;