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

module.exports.userSchema = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(4).max(255).required(),
    username: Joi.string().min(2).max(255).required(),
})