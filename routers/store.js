const express = require('express');
const { stores, createStores } = require('../controllers/store');
const asyncErrorHandler = require("../util/asyncErrorHandler");

const { isLoggedIn } = require('../middleware');

const router = new express.Router();

router.get('/', isLoggedIn, asyncErrorHandler(stores));

router.get('/new', isLoggedIn, createStores );


module.exports = router;


