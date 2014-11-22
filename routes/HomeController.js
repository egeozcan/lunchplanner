HomeController = MainController.extend({

});
Router.route('/', {
  action: function() {
    this.render('home');
    Session.set("currentPath", '/');
  },
  name: 'Home'
});