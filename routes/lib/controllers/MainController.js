MainController = RouteController.extend({
  onBeforeAction: function () {
    console.log("render");
    this.next();
  }
});