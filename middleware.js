module.exports.isLoggedIn = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you need to signed in!!');
        res.redirect('/login');
    }
    next();
})