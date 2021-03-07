const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML',
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value) return helpers.errors('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.bookSchema = Joi.object({
  book: Joi.object({
    title: Joi.string().required().escapeHTML(),
    completed: Joi.boolean(),
    description: Joi.string().min(0).max(250).required()
      .escapeHTML(),
    private: Joi.boolean(),
    category: Joi.string().required(),
    author: Joi.string().required().escapeHTML(),
    image: Joi.string(),
    favourite: Joi.boolean(),
  }).required(),
  image: Joi.string(),
});

module.exports.userSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required()
    .escapeHTML(),
  lastName: Joi.string().min(2).max(255).required()
    .escapeHTML(),
  email: Joi.string().min(5).max(255).email()
    .required()
    .escapeHTML(),
  password: Joi.string().min(4).max(255).required()
    .escapeHTML(),
  username: Joi.string().min(2).max(255).required()
    .escapeHTML(),
});

module.exports.storeSchema = Joi.object({
  store: Joi.object({
    name: Joi.string().min(2).max(255).required()
      .escapeHTML(),
    location: Joi.string().min(5).max(100).escapeHTML(),
    notes: Joi.string().min(2).max(255).escapeHTML(),
  }).required(),
});
