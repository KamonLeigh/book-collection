const express = require('express');
const asyncErrorHandler = require("../util/asyncErrorHandler");
const { books, createBooks } = require("../controllers/books");

const router = new express.Router();

router.get('/books', asyncErrorHandler(books))
      .post('/books', asyncErrorHandler(createBooks))

module.exports = router;
