const express = require('express');
const {
  stores, showStores, createStore, getStore, editStorePage
} = require('../controllers/store');
const asyncErrorHandler = require('../util/asyncErrorHandler');

const { isLoggedIn, isStoreAuthor } = require('../middleware');

const router = new express.Router();

router.get('/', isLoggedIn, asyncErrorHandler(stores))
  .post('/', isLoggedIn, asyncErrorHandler(createStore));

router.get('/new', isLoggedIn, showStores);

router.get('/edit/:id', isLoggedIn, asyncErrorHandler(isStoreAuthor), asyncErrorHandler(editStorePage))

router.get('/:id', isLoggedIn, asyncErrorHandler(isStoreAuthor), asyncErrorHandler(getStore));
module.exports = router;
