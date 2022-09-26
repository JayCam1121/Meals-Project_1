// Models
const { User } = require('./user.model');
const { Meal} = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model')

const initModels = () => {

	Meal.hasMany(Order, { foreignKey: 'mealId' });
	Order.belongsTo(Meal);

	
	User.hasMany(Order, { foreignKey: 'userId' });
	Order.belongsTo(User);

	
	User.hasMany(Review, { foreignKey: 'userId' });
	Review.belongsTo(User);

	Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
	Review.belongsTo(Restaurant);

	Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
	Meal.belongsTo(Restaurant);
};

module.exports = { initModels };