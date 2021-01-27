const User = require("../db/models/user");

module.exports.register = ((req, res) => {
    res.render('users/register', {title: 'Register'})
})

module.exports.registerUser = ( async (req, res) => {

    try { 
    const {email, firstName, lastName, username, password } = req.body;
   
    const user = new User({email, firstName, lastName, username});

    const registerUser = await User.register(user, password);
    
    req.flash('msg-success', 'registered!');
    res.redirect('/books')
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }

});

module.exports.login = ((req, res) => {
    res.render('users/login', { title: 'login'});
}) 

module.exports.loginUser = (( req, res ) => {
    res.redirect('/register')
});