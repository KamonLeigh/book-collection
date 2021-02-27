const express = require('express');
const {
  stores, showStores, createStore, getStore, editStorePage, editStore, deleteStore,
} = require('../controllers/store');
const asyncErrorHandler = require('../util/asyncErrorHandler');

const { isLoggedIn, isStoreAuthor, validateStore } = require('../middleware');

const router = new express.Router();

router.get('/', isLoggedIn, asyncErrorHandler(stores))
  .post('/', isLoggedIn, validateStore, asyncErrorHandler(createStore));

router.get('/new', isLoggedIn, showStores);

router.get('/edit/:id', isLoggedIn, asyncErrorHandler(isStoreAuthor), asyncErrorHandler(editStorePage));

router.get('/:id', isLoggedIn, asyncErrorHandler(isStoreAuthor), asyncErrorHandler(getStore))
  .put('/:id', isLoggedIn, asyncErrorHandler(isStoreAuthor), validateStore, asyncErrorHandler(editStore))
  .delete('/:id', isLoggedIn, asyncErrorHandler(isStoreAuthor), asyncErrorHandler(deleteStore));
module.exports = router;
