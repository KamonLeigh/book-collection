const Book = require("../db/models/book");
const category = require('../util/category');

module.exports.books = async (req, res) => {
    const books = await Book.find({})
    res.render('books/list', { books, title: 'books' });
}

module.exports.createBooks = async (req, res) => {
    const newBook = req.body.book
    newBook.owner = req.user._id
    const book = new Book(newBook);
    await book.save();
    req.flash('msg-success', 'new book created :-)');
    res.redirect('/books');
}

module.exports.bookForm = (req, res) => {
    res.render('books/new', { title: 'create new book', categories: category})
}