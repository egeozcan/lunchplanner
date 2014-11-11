Template.visit_add.helpers({
	restaurant: function () {
		return Collections.Restaurants.findOne(Session.get("restaurantId"));
	}
});