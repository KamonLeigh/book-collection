/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Book = require('./db/models/book');
const Store = require('./db/models/store');
const { bookSchema, userSchema, storeSchema } = require('./schemas');
const ExpressError = require('./util/ExpressError');

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
    return res.redirect('/books');
  }
  next();
};

module.exports.isStoreAuthor = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const store = await Store.findById(id).exec();

  if (!store.author.equals(userId)) {
    req.flash('error', 'you do not have permission to view this :-( ');
    return res.redirect('/store');
  }

  next();
};

module.exports.validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(',');
    throw new ExpressError(msg, 400);
  }

  next();
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(',');
    throw new ExpressError(msg, 400);
  }
  next();
};

module.exports.validateStore = (req, res, next) => {
  const { error } = storeSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(',');
    throw new ExpressError(msg, 400);
  }
  next();
};
