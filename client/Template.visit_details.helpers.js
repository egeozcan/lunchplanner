Template.visit_details.helpers({
    currentVisit: function () {
        return Collections.Visits.findOne(Session.get("visitId"));
    }
});