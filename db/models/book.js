const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
    required: false,
  },
  private: {
    type: Boolean,
    default: false,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  image: {
    url: String,
    public_id: String,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
