const express = require('express');

const {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview,
} = require('../controllers/restaurant.controller');

const { restaurantExist } = require('../middlewares/restaurant.middlewares');
const { reviewExist } = require('../middlewares/review.middlewares');
const { restaurantValidators } = require('../middlewares/validators.middlewares');
const {protectAdmin, protectSession, protectReviewOwners} = require('../middlewares/auth.middlewares');

const restaurantRouter = express.Router();

restaurantRouter.get('/', getAllRestaurants);
restaurantRouter.get('/:id', restaurantExist, getRestaurantById);

restaurantRouter.use(protectSession);

restaurantRouter.post('/', restaurantValidators, createRestaurant);
restaurantRouter.patch('/:id', restaurantExist, protectAdmin, updateRestaurant);
restaurantRouter.delete('/:id', restaurantExist, protectAdmin, deleteRestaurant);

restaurantRouter.post('/reviews/:restaurantId', createReview);
restaurantRouter.patch('reviews/id', reviewExist, protectReviewOwners, updateReview);
restaurantRouter.delete('/reviews/:id', reviewExist, protectReviewOwners, deleteReview);

module.exports = {restaurantRouter};