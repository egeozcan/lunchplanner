Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

MainController = RouteController.extend({
  loadingTemplate: 'loading',
  layoutTemplate: 'LoadingLayout',
  waitOn: function () {
  	return [
    	Meteor.subscribe("visits"),
    	Meteor.subscribe("restaurants"),
    	Meteor.subscribe("allUserData"),
    	Meteor.subscribe("images"),
    	Meteor.subscribe("menus")
  	]
  },
  onBeforeAction: function () {
  	this.layout('ApplicationLayout');
	this.next();
  }
});