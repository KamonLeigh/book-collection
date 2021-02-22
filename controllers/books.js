/* eslint-disable no-underscore-dangle */
const Book = require('../db/models/book');
const category = require('../util/category');
const { cloudinary } = require('../cloudinary');

module.exports.books = async (req, res) => {
  const userId = req.user._id;
  const books = await Book.find({ owner: userId });
  res.render('books/list', { books, title: 'books' });
};

module.exports.createBooks = async (req, res) => {
  const newBook = req.body.book;
  newBook.owner = req.user._id;

  if (req.files) {
    const image = {
      url: req.file.path,
      public_id: req.file.filename,
    };
    newBook.image = image;
  }

  const book = new Book(newBook);
  await book.save();
  req.flash('msg-success', 'new book created :-)');
  res.redirect('/books');
};

module.exports.bookForm = (req, res) => {
  res.render('books/new', { title: 'create new book', categories: category });
};

module.exports.getBook = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  await book.populate('owner').execPopulate();
  if (!book) {
    req.flash('error', 'unable to carry out request');
    return res.redirect('/books');
  }

  return res.render('books/book', { book, title: 'book' });
};

module.exports.editBookPage = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) {
    req.flash('error', 'unable to carry out request');
    return res.redirect('/books');
  }

  return res.render('books/edit', { book, title: 'edit book', categories: category });
};

module.exports.editBook = async (req, res) => {
  const { id } = req.params;
  const editedBook = req.body.book;

  if (req.file) {
    const image = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    editedBook.image = image;
  }

  const book = await Book.findByIdAndUpdate(id, { ...editedBook });
  await book.save();

  if (req.body.currentImage) {
    await cloudinary.uploader.destroy(req.body.currentImage);

    const image = {
      url: '',
      public_id: '',
    };

    await book.updateOne({ image });
  }

  req.flash('msg-success', 'book has been updated!');
  return res.redirect(`/books/${book._id}`);
};

module.exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);

  if (book.image.public_id) {
    await cloudinary.uploader.destroy(book.image.public_id);
  }

  await Book.findOneAndDelete({ _id: id });

  req.flash('msg-success', 'book has been successfully deleted');
  res.redirect('/books');
};
