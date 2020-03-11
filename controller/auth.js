const User = require('../model/user');

exports.login = async (req, res, next) => {
  req.session.isAuthenticated = true;
  req.session.user = await User.findById({ _id: '5e66f5e6456c5b0f1c09cf75' });
  res.redirect('/');
};
