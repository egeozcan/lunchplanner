Template.registerHelper("join", function (arr) {
    return arr.join(", ");
});

Template.registerHelper("year", function () {
    return new Date().getFullYear();
});

Template.registerHelper("isPastDate", function (d) {
    return d < UserVars.date.get();
});

Template.registerHelper("isFutureDate", function (d) {
    return d > UserVars.date.get();
});

Template.registerHelper("getTime", function (d) {
    return d.getHours() + ":" + d.getMinutes();
});

Template.registerHelper("getDate", function (d) {
    return d.toDateString();
});

Template.registerHelper("equals", function (x, y) {
    return x === y;
});

(function () {
    var getUserName = function (id) {
        var user = Meteor.users.findOne(id);
        if (!user) {
            return "anonymous";
        }
        return user.username || (!!user.emails && user.emails.length > 0 ? user.emails[0].address : "A ninja");
    };

    Template.registerHelper("getUsername", getUserName);

    Template.registerHelper("getUsernames", function (ids) {
        return ids.map(getUserName).join(", ");
    });
})()


Template.registerHelper("or", function () {
    for (var i = 0; i < arguments.length; i++) {
        if (!!arguments[i]) {
            return arguments[i];
        }
    }
    return "";
});

Template.registerHelper("restaurantLink", function (restaurantId) {
    var restaurant = Collections.Restaurants.findOne(restaurantId);
    if(!restaurant) {
        return '<a href="#">_</a>';
    }
    return '<a href="/restaurants/#restaurant-' + restaurantId + '">' + restaurant.title + '</a>';
});

Template.registerHelper("moment", function (d) {
    return moment(d).from(UserVars.date.get());
});

Template.registerHelper("random", function () {
    var randomArg = Math.floor(Math.random() * (arguments.length - 1));
    return arguments[randomArg]
});