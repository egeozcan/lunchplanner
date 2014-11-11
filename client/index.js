Session.set("currentDay", new Date());
Session.set("currentPath", window.location.pathname);

Tracker.autorun(function () {
    Meteor.subscribe("visits");
    Meteor.subscribe("restaurants");
    Meteor.subscribe("allUserData");
    Meteor.subscribe("images");
    Meteor.subscribe("menus");
});

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
});

window.adjustChatBox = function () {
    var cb = $(".chat-box");
    if (!cb.length) {
        return;
    }
    var possibleHeight = $(window).height() - cb.offset().top - $(".footer").height() - 70;
    var height = Math.max(possibleHeight, 200);
    cb.children(".chat-messages").height(height - 60);
    cb.height(height);
};

if(window.Notification) {
    Notification.requestPermission();
    window.notify = function(message, options) {
        return new Notification(message, options);
    }
} else {
    window.notify = function() {}
}

$(function() {
    Collections.Visits.find({}).observe({
        added: function(document) {
            if(document.owner !== Meteor.userId()) {
                var user = Meteor.users.findOne(document.owner);
                if(!user) {
                    return;
                }
                var message = user.username + " added a new food option!";
                var restaurant = Collections.Restaurants.findOne(document.restaurantId);
                if(document.title) {
                    message += " with the title " + document.title
                }
                message += " at " + restaurant.title;
                message += " " + moment(document.leaveTime).fromNow();
                var options = {};
                if(restaurant.imageId) {
                    options.icon = Collections.Images.findOne(restaurant.imageId).url({store:'restaurantImageThumbs'})
                }
                var n = notify(message, options);
                n.onclick = function() {
                    window.location = "/visit/details/" + document._id;
                }
            }
        }
    });
});

$(window).on("resize", adjustChatBox);

//Meteor.setInterval(function() {
//    var messageBox = $(".chat-messages");
//    if(messageBox.length === 0 || messageBox[0].scrollHeight - messageBox.scrollTop() !== messageBox.outerHeight()) {
//        return;
//    }
//    messageBox.animate({scrollTop: messageBox.find("strong:last").position().top}, 200);
//}, 300);