const express = require('express');
const {
  addNewUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
  updateMe,
} = require('../controllers/userControllers');
const {
  signUp,
  logIn,
  forgetPassword,
  resetPassword,
  updatePassword,
  accessibleUser,
} = require('../controllers/authContoroller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);

router.post('/forgetPassword', forgetPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateMyPassword', accessibleUser, updatePassword);
router.patch('/updateMe', accessibleUser, updateMe);

router.route('/').get(getAllUsers).post(addNewUser);
router.route('/:id').get(getUserById).patch(editUser).delete(deleteUser);

module.exports = router;
