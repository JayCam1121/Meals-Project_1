const express = require('express');

// Controllers
const {
	createUser,
	updateUser,
	deleteUser,
	getAllOrdersByUser,
	getOrderByUser,
	login,
} = require('../controllers/users.controller');

// Middlewares
const { userExists } = require('../middlewares/users.middlewares');
const {orderExist } = require('../middlewares/order.middlewares');
const { createUserValidators } = require('../middlewares/validators.middlewares');
const {protectSession, protectUsersAccount, protectOrderOwners} = require('../middlewares/auth.middlewares')

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.patch('/:id', userExists, protectUsersAccount, updateUser);

usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);
usersRouter.get('/orders', getAllOrdersByUser);

usersRouter.get('/orders/:id', orderExist, protectOrderOwners, getOrderByUser);

module.exports = { usersRouter };