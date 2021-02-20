const express = require('express');
const multer = require('multer');
const asyncErrorHandler = require('../util/asyncErrorHandler');
const {
  books, createBooks, bookForm, getBook, editBookPage, editBook, deleteBook,
} = require('../controllers/books');
const { isLoggedIn, isAuthor, validateBook } = require('../middleware');
const { storage, cloudinary } = require('../cloudinary');

const upload = multer({ storage });

const router = new express.Router();

router.get('/', isLoggedIn, asyncErrorHandler(books))
  .post('/', isLoggedIn, upload.single('image'), validateBook, asyncErrorHandler(createBooks));

router.get('/new', isLoggedIn, bookForm);
router.get('/edit/:id', isLoggedIn, isAuthor, asyncErrorHandler(editBookPage));

router.get('/:id', isLoggedIn, isAuthor, asyncErrorHandler(getBook))
  .put('/:id', isLoggedIn, isAuthor, upload.single('image'), asyncErrorHandler(editBook));

router.delete('/delete/:id', isLoggedIn, isAuthor, asyncErrorHandler(deleteBook));

module.exports = router;
