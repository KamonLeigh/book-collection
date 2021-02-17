const express = require('express');
const { stores, showStores, createStore } = require('../controllers/store');
const asyncErrorHandler = require("../util/asyncErrorHandler");

const { isLoggedIn } = require('../middleware');

const router = new express.Router();

router.get('/', isLoggedIn, asyncErrorHandler(stores))
      .post('/', isLoggedIn, asyncErrorHandler(createStore));

router.get('/new', isLoggedIn, showStores );


module.exports = router;


