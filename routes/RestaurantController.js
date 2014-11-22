RestaurantController = MainController.extend({

});

Router.route('/restaurants', {
  action: function() {
    this.render('restaurants');
    Session.set("currentPath", '/restaurants');
  },
  controller: RestaurantController
});

Router.route('/restaurant/create', {
  action: function() {
    this.render('restaurant_add');
    Session.set("currentPath", '');
  },
  controller: RestaurantController
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
  },
  controller: RestaurantController
});