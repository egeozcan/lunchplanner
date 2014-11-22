VisitController = MainController.extend({

});

Router.route('/visit/create/:id', {
  action: function() {
    if(!Collections.Restaurants.findOne(this.params.id)) {
      this.render("NotFound");
      return;
    }
    Session.set("restaurantId", this.params.id);
    this.render('visit_add');
    Session.set("currentPath", '');
  },
  controller: VisitController
});

Router.route('/visit/details/:id', {
  action: function() {
    if(!Collections.Visits.findOne(this.params.id)) {
      this.render("NotFound");
      return;
    }
    Session.set("visitId", this.params.id);
    this.render('visit_details');
    Session.set("currentPath", '');
  },
  controller: VisitController
});