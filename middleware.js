module.exports.isLoggedIn = ((req, res, next) => {
    console.log('USER', req.user)
    if (!req.isAuthenticated()) {
        req.flash('error', 'you need to be signed in!!');
        res.redirect('/login');
    }
    next();
})