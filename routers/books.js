const express = require('express');
const Book = require('../db/models/book');

const router = new express.Router();

router.get('/books', (req, res) => {
  res.render('index', { name: "Byron"});
});

router.post('/books', async( req, res) => {
    const book = new Book(req.body);
    console.log(book);

    try {
        await book.save();
        res.status(201).send(book);
    } catch (error) {
        res.status(400).send(error)
    }

})

module.exports = router;
