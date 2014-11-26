Collections.ChatMessages = new Mongo.Collection("chatMessage");
Schemas.ChatMessageSchema = new SimpleSchema({
    title: {
        type: String,
        max: 100,
        optional: true
    },
    message: {
        type: String,
        max: 400
    },
    user: {
        type: String,
        optional: true
    },
    targetUser: {
        type: [String],
        optional: true
    },
    entityType: {
        type: String
    },
    entityId: {
        type: String
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
Collections.ChatMessages.attachSchema(Schemas.ChatMessageSchema);

if (Meteor.isServer) {
    Collections.ChatMessages.allow({
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