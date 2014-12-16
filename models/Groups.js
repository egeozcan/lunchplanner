Collections.Groups = new Mongo.Collection("group");
Schemas.GroupSchema = new SimpleSchema({
    title: {
        type: String,
        max: 100,
        optional: true
    },
    users: {
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
Collections.Groups.attachSchema(Schemas.GroupSchema);

if (Meteor.isServer) {
    Collections.Groups.allow({
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