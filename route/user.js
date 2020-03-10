const express = require('express');

const {
    getAllProducts,addToCart
} = require('../controller/user');

const router = express.Router();

router.get(['/', '/user'], getAllProducts);

router.post('/user/addtocart', addToCart);



module.exports = router;
