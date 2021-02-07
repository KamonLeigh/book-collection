const express = require('express');
const asyncErrorHandler = require("../util/asyncErrorHandler");
const { books, createBooks, bookForm, getBook, editBookPage, editBook, deleteBook  } = require("../controllers/books");
const { isLoggedIn, isAuthor } = require('../middleware');
const {storage, cloudinary} = require('../cloudinary');
const multer = require('multer');

const upload = multer({ storage })

const router = new express.Router();

router.get('/',isLoggedIn,asyncErrorHandler(books))
      .post('/', asyncErrorHandler(createBooks))

router.get('/new', isLoggedIn, upload.single('image'), bookForm);
router.get('/edit/:id', isLoggedIn, isAuthor, asyncErrorHandler(editBookPage))


router.get('/:id', isLoggedIn, isAuthor, asyncErrorHandler(getBook))
      .put('/:id', isLoggedIn, isAuthor, asyncErrorHandler(editBook))

router.delete('/delete/:id', isLoggedIn, isAuthor, asyncErrorHandler(deleteBook))


module.exports = router;
