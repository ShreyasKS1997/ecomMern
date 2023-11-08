const express = require('express');

const { isAuth, authorization } = require('../Middleware/auth');
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.route('/order/new').post(isAuth, newOrder);
router.route('/order/:id').get(isAuth, getSingleOrder);
router.route('/orders/me').get(isAuth, myOrders);
router.route('/admin/orders').get(isAuth, authorization('admin'), getAllOrders);
router
  .route('/admin/order/:id')
  .put(isAuth, authorization('admin'), updateOrder)
  .delete(isAuth, authorization('admin'), deleteOrder);

module.exports = router;
