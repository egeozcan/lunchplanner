Meteor.publish("restaurants", function () {
    return Collections.Restaurants.find({ active: true });
});

Meteor.publish("images", function () {
    return Collections.Images.find();
});

Meteor.publish("menus", function () {
    return Collections.Menus.find();
});

Meteor.publish("visits", function () {
    var startDate = new Date();
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    startDate.setMilliseconds(0);
    return Collections.Visits.find({
        leaveTime: {
            $gte: startDate,
            $lte: moment(startDate).add(1, 'day').toDate()
        },
        active: true
    },
    {
        sort: {
            leaveTime: -1
        }
    });
    //return Collections.Visits.find();
});

Meteor.publish("allUserData", function () {
    return Meteor.users.find({}, {fields: {'username': 1, '_id': 1, 'emails': 1}});
});