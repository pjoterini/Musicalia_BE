const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
	rating: {
		type: Number,
		max: 10,
		min: 1,
		required: true
	},
	albums: {
		type: Array
	},
	coverImage: {
		type: Buffer,
		default: `band name`,
		// required: true
	},
	coverImageType: {
		type: String,
		// required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
})

artistSchema.methods.speak = function speak() {
	const greeting = `i'm ${this.name}, lets fkin rock boi`
	console.log(greeting)
}

module.exports = mongoose.model('Artist', artistSchema)
