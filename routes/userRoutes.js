const express = require('express');
const {
  addNewUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
} = require('../controllers/userControllers');
const { signUp, logIn } = require('../controllers/authContoroller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);

router.route('/').get(getAllUsers).post(addNewUser);
router.route('/:id').get(getUserById).patch(editUser).delete(deleteUser);

module.exports = router;
