Collections.Images = new FS.Collection("images", {
    stores: [
      new FS.Store.FileSystem("restaurantImages", { 
        path: "~/user-files/restaurantImages"
      }),
      new FS.Store.FileSystem("restaurantImageThumbs", {
        path: "~/user-files/restaurantImageThumbs",
        transformWrite: function(fileObj, readStream, writeStream) {
          gm(readStream, fileObj.name()).resize('200', '200').stream().pipe(writeStream);
        }
      })
    ],
    filter: {
      allow: {
        contentTypes: ['image/*']
      }
    }
});
Collections.Images.allow({
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