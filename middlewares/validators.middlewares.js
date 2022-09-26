const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError.util');

const checkValidations = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
		const errorMessages = errors.array().map(err => err.msg);

		const message = errorMessages.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isLength({ min: 3 })
		.withMessage('Name must be at least 3 characters'),
	body('email')
		.isEmail()
		.withMessage('Must provide a valid email'),
	body('password')
		.isString()
		.withMessage('Password must be a string')
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters'),
	checkValidations,
];

const restaurantValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.isLength({ min: 3 })
		.withMessage('Name must be at least 3 characters')
		.notEmpty()
		.withMessage('Name cannot be empty'),
	body('address')
		.isString()
		.withMessage('Address must be a string')
		.isLength({ min: 10 })
		.withMessage('Address must be at least 3 characters')
		.notEmpty()
		.withMessage('Address cannot be empty'),
	body('rating')
		.isNumeric()
		.withMessage('Rating would be a number')
		.custom((value, {req}) =>{
			if(value < 1 || value > 5) {
				throw new Error('Rating must be 1 from 5');
			}
			[];
			return true;
		})
		.isInt()
		.withMessage('Rating would be an interger number')
		.notEmpty()
		.withMessage('Rating cannot be empty'),
	checkValidations,
];

const mealsValidators = [
	body('name')
		.isString()
		.withMessage('Name must be a string')
		.isLength({ min: 3 })
		.withMessage('Name must be at least 3 characters')
		.notEmpty()
		.withMessage('Name cannot be empty'),
	body('price')
		.isNumeric()
		.withMessage('Price must be a number')
		.isInt()
		.withMessage('Price must be an interger number')
		.notEmpty()
		.withMessage('Price cannot be empty'),
	checkValidations,
];

module.exports = { 
	createUserValidators, 
	restaurantValidators, 
	mealsValidators
};