MainController = RouteController.extend({
  onBeforeAction: function () {
    this.next();
  }
});