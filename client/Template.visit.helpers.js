Template.visit.helpers({
    "joined": function(visitId) {
        var visit = Collections.Visits.findOne(visitId);
        return visit.participants && visit.participants.indexOf(Meteor.userId()) >= 0;
    }
});

Template.visit.events({
    "click a.join-lunch": function (e) {
        var visitId = $(e.currentTarget).data("visitId");
        Meteor.call("addUserToVisit", visitId, function(err, res) {
            if(err) {
                alert(err.reason);
            }
        });
    },
    "click a.quit-lunch": function (e) {
        var visitId = $(e.currentTarget).data("visitId");
        Meteor.call("removeUserFromVisit", visitId, function(err, res) {
            if(err) {
                alert(err.reason);
            }
        });
    },
    "click a.delete-lunch": function (e) {
        var visitId = $(e.currentTarget).data("visitId");
        if(!confirm("Participants will be annoyed?! RLY DESTROY?")) {
            return;
        }
        Meteor.call("deactivateVisit", visitId, function(err, res) {
            if(err) {
                alert(err.reason);
            }
        });
    }
});