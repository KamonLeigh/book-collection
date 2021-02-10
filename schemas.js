const Joi = require('joi');


module.exports.bookSchema = Joi.object({
    book: Joi.object({
        title: Joi.string().required(),
        completed: Joi.boolean(),
        description: Joi.string().min(0).max(250).required(),
        private: Joi.boolean(),
        category: Joi.string().required(),
        author: Joi.string().required(),
        image: Joi.string()
    }).required(),
    image: Joi.string()
}) 