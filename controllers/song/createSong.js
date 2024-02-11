const { ObjectId } = require('mongodb')
const Song = require('../../models/song')
const { mapCover } = require('../utility/mapCover')

const createSong = async (req, res) => {
  try {
    const song = new Song({
      title: req.body.title,
      artist: new ObjectId(req.body.artistID),
      rating: Number(req.body.rating),
      coverImage: req.file.buffer,
      coverImageType: req.file.mimetype
    })

    const { _id } = await song.save()

    const createdSong = await mapCover(
      Song.findById(_id.toHexString()).populate('artist').lean().exec()
    )

    res.status(200).json({ createdSong })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

exports.createSong = createSong
