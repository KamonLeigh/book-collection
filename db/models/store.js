/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const opts = { toJSON: { virtuals: true }};
const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  notes: {
    type: String,
    required: false,
  },
  location: {
    type: String,
  },

}, opts);

const Store = mongoose.model('Store', storeSchema);

// eslint-disable-next-line func-names
storeSchema.virtual('properties.popUpMarkup').get(function () {
  return `
    <strong><a href="/stores/${this._id}">${this.name}</a></strong>
    <p>${this.location}</p>
  `;
});

module.exports = Store;
