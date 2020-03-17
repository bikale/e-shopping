const jwt = require('jsonwebtoken');
const User = require('../model/user');
const Product = require('../model/admin');
const ObjectId = require('mongodb').ObjectID;

// @desc      Get All user products
// @route     GET / ||  /user
// @access    Public

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();
  const { cartListCount } = await getloggedUser(req, res, next);

  res.render('user/shop', { products, cartListCount });
};

// @desc      Add item to the user cart
// @route     Post /user/addtocart
// @access    Public

exports.addToCart = async (req, res, next) => {
  const productId = req.body.id;
  const id = req.user._id;
  const currentUser = await User.findById(id);

  currentUser.addItemToCart(productId);

  res.redirect('/');
};

// @desc      Get user cart list
// @route     GET /user/cart
// @access    Public

exports.getUserCart = async (req, res, next) => {
  const id = req.user._id;
  const currentUser = await User.findById(id);
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

  const id = req.user._id;
  const currentUser = await User.findById(id);

  currentUser.deleteItemFromCart(productId);

  res.redirect(`/user/cart`);
};

// @desc      Get payment form to checkout
// @route     Get /user/payment
// @access    Private

exports.paymentForm = async (req, res, next) => {
  const id = req.user._id;

  const currentUser = await User.findById(id);
  let cartList = await currentUser
    .populate('cart.items.productId')
    .execPopulate();
  cartList = cartList.cart.items;

  res.render('user/payment', { products: cartList });
};

// @desc    Get current logged in user and return number of item in the cart
getloggedUser = async (req, res, next) => {
  if (req.cookies.token) {
    token = req.cookies.token;
    const decoded = jwt.verify(token, 'asdfrewq'); //"asdfrewq" is the secret
    user = await User.aggregate([
      { $match: { _id: ObjectId(decoded.id) } },
      { $unwind: '$cart.items' },
      {
        $group: {
          _id: null,
          cartListCount: { $sum: '$cart.items.quantity' }
        }
      },
      { $project: { _id: 0, cartListCount: 1 } }
    ]);
    return user[0];
  }
  return 0;
};
