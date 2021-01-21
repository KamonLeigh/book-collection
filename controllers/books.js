const Book = require("../db/models/book");

module.exports.books = async (req, res) => {
    const books = await Book.find({})
    res.render('index', { books });
}

module.exports.createBooks = async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
}