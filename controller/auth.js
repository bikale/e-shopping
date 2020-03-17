const bcrypt = require('bcryptjs');
const User = require('../model/user');

// @desc    Register User
// @route   Post /api/v1/auth/register
// @access  Public

exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role
  });
};

// @desc    Login User Form
// @route   Get /login
// @access  Public
exports.loginForm = async (req, res, next) => {
  const { loginMsg } = req.flash();

  res.render('user/login', { loginMsg });
};

// @desc    Login User
// @route   Post /login
// @access  Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    req.flash('loginMsg', 'Please provide an email and password');
    res.redirect('/login');
    return;
  }

  // Check for user
  const user = await User.findOne({ email });

  if (!user) {
    req.flash('loginMsg', 'Invalid Username and Password');
    res.redirect('/login');
    return;
  }

  //Match user entered password to hashed password in database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    req.flash('loginMsg', 'Invalid Username and Password');
    res.redirect('/login');
    return;
  }



  // Create token
  const token = user.getSignedJwtToken();

  //create cookie and send response
  res
    .cookie('token', token, {
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
      secure: false
    })
    .redirect('/');
};

// @desc      Log user out / clear cookie
// @route     GET  /logout
// @access    Private
exports.logout = async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10) // expires in 10 second
  });

  res.redirect('/');
};
