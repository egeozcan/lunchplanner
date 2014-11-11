Template.restaurant_delete.helpers({
	restaurant: function () {
		return Collections.Restaurants.findOne(Session.get("restaurantId"));
	}
});

Template.restaurant_delete.events({
	"click a.btn-danger": function() {
		Meteor.call("deactivateRestaurant", Session.get("restaurantId"), function() {
			window.location = "/restaurants";
		})
	}
})