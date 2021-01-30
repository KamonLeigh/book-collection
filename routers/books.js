const express = require('express');
const asyncErrorHandler = require("../util/asyncErrorHandler");
const { books, createBooks, bookForm, getBook } = require("../controllers/books");
const { isLoggedIn, isAuthor } = require('../middleware');

const router = new express.Router();

router.get('/',isLoggedIn, asyncErrorHandler(books))
      .post('/', asyncErrorHandler(createBooks))

router.get('/new', isLoggedIn, bookForm);

router.get('/:id', isLoggedIn, isAuthor, asyncErrorHandler(getBook));

module.exports = router;
