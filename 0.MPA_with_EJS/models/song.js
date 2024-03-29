const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Artist'
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Artist'
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

songSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Song', songSchema)
