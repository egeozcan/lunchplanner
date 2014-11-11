Template.restaurant.helpers({
    image: function(restaurantId) {
        var restaurant = Collections.Restaurants.findOne(restaurantId);
        if(!restaurant.imageId) {
            return null;
        }
        var image = Collections.Images.findOne(restaurant.imageId);
        return image;
    }
});

Template.restaurant.events({
    'change .add-image': function(event, template) {
        var restaurantId = $(event.currentTarget).data("restaurantId");
        FS.Utility.eachFile(event, function(file) {
            Collections.Images.insert(file, function (err, fileObj) {
                Meteor.call("setRestaurantImage", restaurantId, fileObj._id);
            });
        });
    },
    'click .remove-image': function(event, template) {
        var restaurantId = $(event.currentTarget).data("restaurantId");
        Meteor.call("deleteRestaurantImage", restaurantId);
    }
});