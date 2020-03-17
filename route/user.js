const express = require('express');

const {
  getAllProducts,
  addToCart,
  getUserCart,
  deleteCartItem,
  paymentForm
} = require('../controller/user');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get(['/', '/user'], getAllProducts);

router.post('/user/addtocart', protect, authorize('user'), addToCart);

router.get('/user/cart', protect, authorize('user'), getUserCart);

router.get('/user/payment', protect, authorize('user'), paymentForm);

router.get(
  '/user/deleteCartItem/:productid',
  protect,
  authorize('user'),
  deleteCartItem
);

module.exports = router;
