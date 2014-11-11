Meteor.methods({
    addUserToVisit: function addUserToVisit(visitId) {
        check(visitId, String);
        var visit = Collections.Visits.findOne(visitId);
        if (!this.userId || !visit) {
            throw new Meteor.Error("logged-out",
                "Surprise: The user must be logged in to join a lunch.");
        }
        if (!visit.participants || visit.participants.indexOf(this.userId) < 0) {
            Collections.Visits.update(visitId, {$push: {participants: Meteor.userId()}})
        }
        return true;
    },
    removeUserFromVisit: function removeUserFromVisit(visitId) {
        check(visitId, String);
        var visit = Collections.Visits.findOne(visitId);
        if (!this.userId || !visit) {
            throw new Meteor.Error("logged-out",
                "Surprise: The user must be logged in to quit a lunch.");
        }
        if(this.userId === visit.owner) {
            throw new Meteor.Error("owner",
                "You can't leave. You're stuck, sorry :(");
        }
        if (visit.participants && visit.participants.indexOf(this.userId) >= 0) {
            Collections.Visits.update(visitId, {$pull: {participants: Meteor.userId()}})
        }
        return true;
    },
    sendChatMessageToVisit: function sendChatMessageToVisit(visitId, message) {
        check(visitId, String);
        check(message, String);
        var visit = Collections.Visits.findOne(visitId);
        if (!this.userId || !visit) {
            throw new Meteor.Error("logged-out",
                "You may or may not have forgotten to create an account.\n" +
                "People with no accounts are considered full (as in, not hungry).\n" +
                "Thanks for your understanding.\n" +
                "The Food Planning Company");
        }
        if(message.length < 2) {
            return;
        }
        Collections.Visits.update(visitId, {$push: {chatMessages: {
            user: Meteor.userId(),
            message: message
        }}})
    },
    deactivateRestaurant: function deactivateRestaurant(restaurantId) {
        check(restaurantId, String);
        var restaurant = Collections.Restaurants.findOne(restaurantId);
        if (!this.userId || !restaurant || restaurant.owner !== this.userId) {
            throw new Meteor.Error("junkie","No.");
        }
        Collections.Restaurants.update(restaurantId, {$set: {active: false}});
        Collections.Visits.update({restaurantId: restaurantId}, {$set: {active: false}}, {multi: true});
    },
    deactivateVisit: function deactivateVisit(visitId) {
        check(visitId, String);
        var visit = Collections.Visits.findOne(visitId);
        if (!this.userId || !visit || visit.owner !== this.userId) {
            throw new Meteor.Error("junkie","No.");
        }
        Collections.Visits.update(visitId, {$set: {active: false}});
    },
    setRestaurantImage: function setRestaurantImage(restaurantId, imageId) {
        check(restaurantId, String);
        check(imageId, String);
        var restaurant = Collections.Restaurants.findOne(restaurantId);
        if (!this.userId || !restaurant || restaurant.owner !== this.userId) {
            throw new Meteor.Error("junkie","No.");
        }
        Collections.Restaurants.update(restaurantId, {$set: {imageId: imageId}});
    },
    deleteRestaurantImage: function deleteRestaurantImage(restaurantId) {
        check(restaurantId, String);
        var restaurant = Collections.Restaurants.findOne(restaurantId);
        if (!this.userId || !restaurant || restaurant.owner !== this.userId) {
            throw new Meteor.Error("junkie","No.");
        }
        Collections.Images.remove(restaurant.imageId);
        Collections.Restaurants.update(restaurantId, {$set: {imageId: null}});
    }
});