const express = require('express');
const {
  addNewUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
} = require('../controllers/userControllers');
const { signUp } = require('../controllers/authContoroller');

const router = express.Router();

router.route('/signUp', signUp);

router.route('/').get(getAllUsers).post(addNewUser);
router.route('/:id').get(getUserById).patch(editUser).delete(deleteUser);

module.exports = router;
