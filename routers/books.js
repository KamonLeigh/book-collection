const express = require('express');
const asyncErrorHandler = require("../util/asyncErrorHandler");
const { books, createBooks, bookForm } = require("../controllers/books");
const { isLoggedIn } = require('../middleware');

const router = new express.Router();

router.get('/',isLoggedIn, asyncErrorHandler(books))
      .post('/', asyncErrorHandler(createBooks))

router.get('/new', isLoggedIn, bookForm)

module.exports = router;
