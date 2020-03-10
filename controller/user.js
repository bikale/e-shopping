const User = require('../model/user');
const Product = require('../model/admin');

// @desc      Get All user products
// @route     GET / ||  /user
// @access    Public

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  res.render('user/shop', { products });
};

// @desc      Add item to the user cart
// @route     Post /user/addtocart
// @access    Public

exports.addToCart = async (req, res, next) => {
  const productId = req.body.id;

  // const productChoice = await Product.findById({_id:req.body.id})
  const currentUser = await User.findById({ _id: '5e66f5e6456c5b0f1c09cf75' });

  currentUser.addItemToCart(productId);


  res.redirect('/');
};
