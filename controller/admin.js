

const Product = require('../model/admin');

// @desc      Get All products
// @route     GET /admin ||  /admin/products
// @access    Public

exports.getAllProducts = async (req, res, next) => {
  const products = await Product.find();

  res.render('admin/product', { products });
};

// @desc      Get Form for adding product item
// @route     GET admin/addproduct
// @access    Public
exports.addProductForm = (req, res, next) => {
  res.render('admin/addproduct');
};

// @desc      Create product item
// @route     POST admin/addproduct
// @access    Private
exports.createProducts = async (req, res, next) => {
  await Product.create(req.body);
  res.redirect('/admin');
};

// @desc      Edit products item detail
// @route     POST admin/editproduct
// @access    Private
exports.editProduct = async (req, res, next) => {
  await Product.findOneAndUpdate({ _id: req.body.id }, req.body);
  res.redirect('/admin');
};

// @desc      delete products item
// @route     POST admin/deleteProduct
// @access    Private
exports.deleteProduct = async (req, res, next) => {
  await Product.findByIdAndDelete({ _id: req.body.id });
  res.redirect('/admin');
};
