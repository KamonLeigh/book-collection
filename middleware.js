const Book = require('./db/models/book');
const Books = require('./db/models/book');

module.exports.isLoggedIn = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you need to be signed in!!');
        res.redirect('/login');
    }
    next();
});

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.user._id;

    const book = await Book.findById(id).exec();

    if (!book.owner.equals(userId)) {
        req.flash('error', 'you do not have permission to do this :-(');
        return res.redirect(`/login`);
    }
     next();
};