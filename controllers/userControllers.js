const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`),
);

const getAllUsers = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
};
const addNewUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
};
const getUserById = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
};
const editUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
};
const deleteUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'not implemented yet' });
};

module.exports = { getAllUsers, addNewUser, getUserById, editUser, deleteUser };
