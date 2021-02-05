const express = require('express');
const { stores } = require('../controllers/store');
const asyncErrorHandler = require("../util/asyncErrorHandler");

const { isLoggedIn } = require('../middleware');

const router = new express.Router();

router.get('/', isLoggedIn, asyncErrorHandler(stores));


module.exports = router;


