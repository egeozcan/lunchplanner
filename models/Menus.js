Collections.Menus = new FS.Collection("menus", {
  stores: [
    new FS.Store.FileSystem("menus", { 
      path: "~/user-files/menus"
    })
  ]
});
Collections.Menus.allow({
  insert: function (userId, doc) {
    return !!userId;
  },
  update: function (userId, doc) {
    return !!userId;
  },
  download: function() {
    return true;
  }
});