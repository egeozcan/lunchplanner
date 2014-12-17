RegionAndRouteSelectionController = MainController.extend({

});

Router.route('/start', {
  action: function() {
    this.render('start');
    Session.set("currentPath", '/start');
  },
  controller: RegionAndRouteSelectionController
});

Router.route('/start/:region/:group', {
  action: function() {
    Session.set("regionId", this.params.region);
    Session.set("groupId", this.params.group);
  },
  controller: RegionAndRouteSelectionController
});