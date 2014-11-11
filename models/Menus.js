Collections.Menus = new FS.Collection("menus", {
  stores: [
    new FS.Store.FileSystem("menus", { 
      path: "~/user-files/menus"
    })
  ]
});