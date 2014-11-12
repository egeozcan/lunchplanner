Template.restaurants.helpers({
	restaurants: function () {
		return Collections.Restaurants.find({active: true}, { sort: { title: 1 } });
	},
	hasRestaurants: function() {
		return Collections.Restaurants.find().count() > 0;
	}
});