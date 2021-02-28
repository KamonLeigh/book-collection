/* eslint-disable no-underscore-dangle */
const crypto = require('crypto');
const User = require('../db/models/user');
const { sendWelcomeMessage, resetEmail } = require('../email/account');

module.exports.register = ((req, res, next) => {
  res.render('users/register', { title: 'Register' });
});

module.exports.registerUser = async (req, res, next) => {
  try {
    const {
      email, firstName, lastName, username, password,
    } = req.body;

    const user = new User({
      email, firstName, lastName, username,
    });

    const registerUser = await User.register(user, password);

    await sendWelcomeMessage(user.email, user.username);
    req.login(registerUser, (err) => {
      if (err) { return next(err); }

      req.flash('msg-success', 'you have logged in');
      return res.redirect('/books');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
};

module.exports.login = ((req, res) => {
  res.render('users/login', { title: 'login' });
});

module.exports.loginUser = ((req, res) => {
  req.flash('msg-success', 'welcome back :-)');
  res.redirect('/books');
});

module.exports.logoutUser = ((req, res) => {
  req.logout();
  req.flash('msg-success', 'You have been signed out!');
  res.redirect('/login');
});

module.exports.user = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).exec();
  res.render('users/me', { title: 'profile', user });
};

module.exports.forgotPw = (req, res) => {
  res.render('users/forgotPassword', { title: 'forgot password' });
};

module.exports.postForgotPw = async (req, res) => {
  const token = await crypto.randomBytes(20).toString('hex');
  const { email } = req.body;

  const user = User.findOne({ email });

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();

  await resetEmail(email, token, req.headers.host);
  if (!user) {
    req.flash('error', 'No account with that email could be found');
    return res.redirect('/forgot');
  }

  req.flash('msg-success', `An email has been sent to ${email} with further instructions.`);
  return res.redirect('/forgot');
};
