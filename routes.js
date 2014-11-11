Router.configure({
  layoutTemplate: 'ApplicationLayout',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  action: function() {
    this.render('home');
    Session.set("currentPath", '/');
  }
});

Router.route('/restaurants', {
  action: function() {
    this.render('restaurants');
    Session.set("currentPath", '/restaurants');
  }
});

Router.route('/restaurant/create', {
  action: function() {
    this.render('restaurant_add');
    Session.set("currentPath", '');
  }
});

Router.route('/restaurant/delete/:id', {
  action: function() {
    if(!Collections.Restaurants.findOne(this.params.id)) {
      this.render("NotFound");
      return;
    }
    Session.set("restaurantId", this.params.id);
    this.render('restaurant_delete');
    Session.set("currentPath", '');
  }
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
  }
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
  }
});