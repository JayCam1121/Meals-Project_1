const express = require('express');

const {
    createMeal,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal
} = require('../controllers/meal.controller');

const {mealExist} = require('../middlewares/meals.middlewares');
const { restaurantExist } = require('../middlewares/restaurant.middlewares');
const { mealsValidators } = require('../middlewares/validators.middlewares');
const { protectAdmin, protectSession } = require('../middlewares/auth.middlewares');

const mealRouter = express.Router();

mealRouter.get('/', getAllMeals);
mealRouter.get('/:id', getMealById);

mealRouter.use(protectSession);

mealRouter.post('/:id', restaurantExist, mealsValidators, createMeal);
mealRouter.patch('/:id', mealExist, protectAdmin, deleteMeal);

module.exports = { mealRouter };