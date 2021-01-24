const Book = require("../db/models/book");

module.exports.register = ((req, res) => {
    res.render('users/register')
})
