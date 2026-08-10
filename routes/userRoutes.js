const express = require('express');
const {
  addNewUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userControllers');
const {
  signUp,
  logIn,
  forgetPassword,
  resetPassword,
  updatePassword,
  accessibleUser,
  restrictTo,
} = require('../controllers/authContoroller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/forgetPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(accessibleUser);

router.patch('/updateMyPassword', updatePassword);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);
router.delete('/me', getMe, getUserById);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(addNewUser);
router.route('/:id').get(getUserById).patch(editUser).delete(deleteUser);

module.exports = router;
