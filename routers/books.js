const express = require('express');
const asyncErrorHandler = require("../util/asyncErrorHandler");
const { books, createBooks } = require("../controllers/books");
const { isLoggedIn } = require('../middleware');

const router = new express.Router();

router.get('/',isLoggedIn, asyncErrorHandler(books))
      .post('/', asyncErrorHandler(createBooks))

module.exports = router;
