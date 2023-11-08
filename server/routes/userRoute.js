const express = require('express');

const { isAuth, authorization } = require('../Middleware/auth');

const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  changePassword,
  updateUserProfile,
  getAllUsers,
  getSingleUsers,
  updateUserRole,
  deleteUserProfile,
} = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logout);

router.route('/me').get(isAuth, getUserDetails);

router.route('/password/update').put(isAuth, changePassword);

router.route('/me/update').put(isAuth, updateUserProfile);

router.route('/admin/users').get(isAuth, authorization('admin'), getAllUsers);

router
  .route('/admin/user/:id')
  .get(isAuth, authorization('admin'), getSingleUsers)
  .put(isAuth, authorization('admin'), updateUserRole)
  .delete(isAuth, authorization('admin'), deleteUserProfile);

module.exports = router;
