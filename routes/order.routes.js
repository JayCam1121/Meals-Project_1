const express = require('express');

const {
    createOrder,
    getAllOrders,
    completeOrder,
    cancelOrder,
} = require('../controllers/order.controller');

const { orderExist } = require('../middlewares/order.middlewares');
const { protectSession, protectOrderOwners } = require('../middlewares/auth.middlewares');

const orderRouter = express.Router();

orderRouter.use(protectSession);

orderRouter.post('/', createOrder);
orderRouter.get('/', getAllOrders);
orderRouter.patch('/:id', orderExist, protectOrderOwners, completeOrder);
orderRouter.delete('/:id', orderExist, protectOrderOwners, cancelOrder);

module.exports = {orderRouter};