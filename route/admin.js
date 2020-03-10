const express = require('express');

const {
  getAllProducts,
  addProductForm,
  createProducts,
  editProduct,
  deleteProduct
} = require('../controller/admin');

const router = express.Router();

router.get(['/', '/products'], getAllProducts);

router.get('/addproduct', addProductForm);
router.post('/addproduct', createProducts);

router.post('/editproduct', editProduct);


router.post('/deleteProduct', deleteProduct);

module.exports = router;
