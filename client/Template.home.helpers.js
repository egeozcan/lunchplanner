Template.home.helpers({
    visits: function () {
        return Collections.Visits.find();
    },
    visitClass: function (visit) {
        var time = visit.leaveTime;
        var curTime = UserVars.date.get();
    },
    hasVisits: function() {
        return Collections.Visits.find().count() > 0;
    }
});