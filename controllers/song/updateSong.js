const Song = require('../../models/song')
const { ObjectId } = require('mongodb')
const { mapCover } = require('../utility/mapCover')

const updateSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
    song.title = req.body.title
    song.artist = new ObjectId(req.body.artistID)
    song.rating = req.body.rating
    if (req.file) {
      song.coverImage = req.file.buffer
      song.coverImageType = req.file.mimetype
    }

    const { _id } = await song.save()

    const updatedSong = await mapCover(
      Song.findById(_id.toHexString()).populate('artist').lean().exec()
    )

    res.status(200).json({ updatedSong })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

exports.updateSong = updateSong
