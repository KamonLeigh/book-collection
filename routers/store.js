const express = require('express');
const {
  stores, showStores, createStore, getStore,
} = require('../controllers/store');
const asyncErrorHandler = require('../util/asyncErrorHandler');

const { isLoggedIn } = require('../middleware');

const router = new express.Router();

router.get('/', isLoggedIn, asyncErrorHandler(stores))
  .post('/', isLoggedIn, asyncErrorHandler(createStore));

router.get('/new', isLoggedIn, showStores);

router.get('/:id', isLoggedIn, asyncErrorHandler(getStore));
module.exports = router;
