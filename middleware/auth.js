const User = require('../model/user');

//Protect Routes
exports.protect = (req, res, next) => {
  if (!req.session.isAuthenticated) {
    return res.redirect('/login');
  }
  next();
};

// Grant access to specific roles
exports.authorize = role => {
  return (req, res, next) => {
    if (role == req.session.user.roles) {
      next();
    } else {
      res.send('You are not authorized');
    }
  };
};
