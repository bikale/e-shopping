const User = require('../model/user');
const Product = require('../model/admin');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectID;

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

// @desc      Get user cart list
// @route     GET /user/cart
// @access    Public

exports.getUserCart = async (req, res, next) => {
  const currentUser = await User.findById({ _id: '5e66f5e6456c5b0f1c09cf75' });

  let cartList = await currentUser
    .populate('cart.items.productId')
    .execPopulate();
  cartList = cartList.cart.items;

  res.render('user/cartlist', { products: cartList });
};

// @desc      Delete item from the user cart
// @route     Delete /user/deleteCartItem
// @access    Public

exports.deleteCartItem = async (req, res, next) => {
  const productId = req.params.productid;

  const currentUser = await User.findById({ _id: '5e66f5e6456c5b0f1c09cf75' });

  currentUser.deleteItemFromCart(productId);

  res.redirect('/user/cart/5e66f5e6456c5b0f1c09cf75');
};
