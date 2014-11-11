UserVars = {
    date: new ReactiveVar(new Date())
};

Meteor.setInterval(function() {
    UserVars.date.set(new Date());
}, 10000)