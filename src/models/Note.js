const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},

		user: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		collection: "notes-app-mongo__note",
	}
);

module.exports = model("Note", noteSchema);
