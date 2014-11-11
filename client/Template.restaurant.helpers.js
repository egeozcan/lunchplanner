Template.restaurant.helpers({
    image: function(restaurantId) {
        var restaurant = Collections.Restaurants.findOne(restaurantId);
        if(!restaurant.imageId) {
            return null;
        }
        return Collections.Images.findOne(restaurant.imageId);
    },
    menu: function(restaurantId) {
        var restaurant = Collections.Restaurants.findOne(restaurantId);
        if(!restaurant.menuId) {
            return null;
        }
        var menu = Collections.Menus.findOne(restaurant.menuId);
        return menu;
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
    },
    'change .add-menu': function(event, template) {
        var restaurantId = $(event.currentTarget).data("restaurantId");
        FS.Utility.eachFile(event, function(file) {
            Collections.Menus.insert(file, function (err, fileObj) {
                Meteor.call("setRestaurantMenu", restaurantId, fileObj._id);
            });
        });
    },
    'click .remove-menu': function(event, template) {
        var restaurantId = $(event.currentTarget).data("restaurantId");
        Meteor.call("deleteRestaurantMenu", restaurantId);
    }
});