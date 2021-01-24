const express = require('express');
const asyncErrorHandler = require("../util/asyncErrorHandler");
const { books, createBooks } = require("../controllers/books");

const router = new express.Router();

router.get('/', asyncErrorHandler(books))
      .post('/', asyncErrorHandler(createBooks))

module.exports = router;
