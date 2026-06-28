const express = require('express');
const {
  addNewUser,
  deleteUser,
  editUser,
  getAllUsers,
  getUserById,
} = require('../controllers/userControllers');

const route = express.Router();

route.route('/').get(getAllUsers).post(addNewUser);
route.route('/:id').get(getUserById).patch(editUser).delete(deleteUser);

module.exports = route;
