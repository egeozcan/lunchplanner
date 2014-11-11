Collections.Restaurants = new Mongo.Collection("restaurants");
Schemas.RestaurantSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Name",
		max: 200,
		autoform: {
		  placeholder: "What is it called? NORMA?! Dude. Give us something fancy next time..."
		}
	},
	address: {
		type: String,
		label: "Address",
		max: 600,
		autoform: {
		  type: "textarea",
		  rows: 4,
		  placeholder: "Infinite Loop, 1, CA"
		}
	},
	imageId: {
		type: String,
		optional: true
	},
	website: {
		type: String,
		regEx: SimpleSchema.RegEx.Url,
		optional: true,
		autoform: {
			placeholder: "If you don't write http at the beginning, this field doesn't validate. Joke's on you!"
		}
	},
	phone: {
		type: String,
		max: 50,
		optional: true,
		autoform: {
			placeholder: "format: +49 01101000 01100101 01101100 01101100 01101111"
		}
	},
	notes: {
		type: String,
		label: "Notes",
		optional: true,
		max: 600,
		autoform: {
		  type: "textarea",
		  rows: 4,
		  placeholder: "Owners are French. They give you the other side of the sandwich. They are closed yesterdays." +
		  " Please be creative in this field. You only have 600 characters though. Write more and our database crashes" +
		  " and the world ends and stuff. "
		}
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			} else if (this.isUpsert) {
				return {$setOnInsert: new Date()};
			} else {
				this.unset();
			}
		}
	},
	active: {
		type: Boolean,
		optional: true
	},
	owner: {
		type: String,
		optional: true
	}
});
Collections.Restaurants.attachSchema(Schemas.RestaurantSchema);
Collections.Restaurants.allow({
	insert: function (userId, doc) {
		doc.owner = userId;
		doc.active = true;
		return !!userId;
	}
})