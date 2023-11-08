const express = require('express');

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getAllReviews,
  deleteReview,
  getAdminProducts,
} = require('../controllers/productController');

const { isAuth, authorization } = require('../Middleware/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);
router
  .route('/admin/products')
  .get(isAuth, authorization('admin'), getAdminProducts);
router
  .route('/admin/product/new')
  .post(isAuth, authorization('admin'), createProduct);
router
  .route('/admin/product/:id')
  .put(isAuth, authorization('admin'), updateProduct)
  .delete(isAuth, authorization('admin'), deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuth, createProductReview);

router.route('/reviews').get(getAllReviews).delete(isAuth, deleteReview);

module.exports = router;
