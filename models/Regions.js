Collections.Regions = new Mongo.Collection("region");
Schemas.RegionSchema = new SimpleSchema({
    title: {
        type: String,
        max: 100,
        optional: true
    },
    restaurants: {
        type: [String],
        optional: true
    },
    isPrivate: {
        type: Boolean,
        defaultValue: false
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();
            }
        }
    }
});
Collections.Regions.attachSchema(Schemas.RegionSchema);

if (Meteor.isServer) {
    Collections.Regions.allow({
        insert: function (userId, doc) {
            doc.user = userId;
            return !!userId;
        },
        update: function() {
            return false;
        },
        remove: function (userId, doc) {
            return doc.user === userId;
        }
    });
}