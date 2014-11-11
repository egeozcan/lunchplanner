Template.restaurants.helpers({
	restaurants: function () {
		return Collections.Restaurants.find({active: true});
	},
	hasRestaurants: function() {
		return Collections.Restaurants.find().count() > 0;
	}
});