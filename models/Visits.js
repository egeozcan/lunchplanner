Collections.Visits = new Mongo.Collection("visits");
Schemas.VisitSchema = new SimpleSchema({
    title: {
        type: String,
        label: "Give this journey a name!",
        max: 200,
        optional: true,
        autoform: {
            placeholder: "'The amazing journey to supermarket', maybe?"
        }
    },
    description: {
        type: String,
        label: "Description (packet service? driving? any details?)",
        max: 200,
        optional: true,
        autoform: {
            type: "textarea",
            rows: 4,
            placeholder: "A good description may cause too many hungry people joining. " +
            "The Food Planning Company advises you to write a bad description."
        }
    },
    restaurantId: {
        type: String
    },
    leaveHour: {
        type: Number,
        label: "Hour",
        min: 0,
        max: 23,
        autoform: {
            min: 0,
            max: 23
        }
    },
    chatMessages: {
        type: [Object],
        optional: true
    },
    "chatMessages.$.user": {
        type: String
    },
    "chatMessages.$.message": {
        type: String
    },
    active: {
        type: Boolean,
        optional: true
    },
    leaveMinute: {
        type: Number,
        label: "Minute",
        min: 0,
        max: 59,
        autoform: {
            min: 0,
            max: 59
        }
    },
    //leave-time is always today. can't currently create a trip for future days.
    //why? because of the following very ultra complex amazing algorithm.
    //(I'M LAZY OK?)
    leaveTime: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                var d = new Date();
                var hour = parseInt(this.field("leaveHour").value, 10);
                var minute = parseInt(this.field("leaveMinute").value, 10);
                d.setHours(hour);
                d.setMinutes(minute);
                d.setMilliseconds(0);
                return d;
            }
        }
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
    },
    participants: {
        type: [String],
        optional: true
    },
    owner: {
        type: String,
        optional: true
    }
});
Collections.Visits.attachSchema(Schemas.VisitSchema);

if (Meteor.isServer) {
    Collections.Visits.allow({
        insert: function (userId, doc) {
            doc.owner = userId;
            doc.active = true;
            return !!userId;
        },
        update: function(userId, doc, fieldNames, modifier) {
            console.log(arguments);
            return false; //todo: well, obviously...
        },
        remove: function (userId, doc) {
            return doc.owner === userId;
        }
    });
}