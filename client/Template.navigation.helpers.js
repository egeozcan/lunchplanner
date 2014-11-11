Template.navigation.helpers({
	listLink: function (name, path) {
		return '<li' + (Session.get("currentPath") === path ? ' class="active"' : '')  + '><a href="' + path + '">' + name + '</a></li>'
	}
})