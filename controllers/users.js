const User = require("../db/models/user");

module.exports.register = ((req, res) => {
    res.render('users/register', {title: 'Register'})
})

module.exports.registerUser = ( async (req, res) => {

    try { 
    const {email, firstName, lastName, username, password } = req.body;
   
    const user = new User({email, firstName, lastName, username});
    console.log(user);
    const registerUser = await User.register(user, password);
    console.log(registerUser)
    res.redirect('/books')
    } catch {
        res.redirect('/register')
    }

})