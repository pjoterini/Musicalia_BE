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
	coverImage: {
        type: Buffer,
        required: true
    },
    coverImageType: {
        type: String,
        required: true
    },
	createdAt: {
		type: Date,
		required: true,
		default: Date.now
	}
})

artistSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Artist', artistSchema)
