const Artist = require('../../models/artist')
const { mapCover } = require('../utility/mapCover')

const updateArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)
    artist.name = req.body.name
    artist.genre = req.body.genre
    artist.rating = req.body.rating
    if (req.file) {
      artist.coverImage = req.file.buffer
      artist.coverImageType = req.file.mimetype
    }

    const { _id } = await artist.save()

    const updatedArtist = await mapCover(
      Artist.findById(_id.toHexString()).lean().exec()
    )

    res.status(200).json({ updatedArtist })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: error.message })
  }
}

exports.updateArtist = updateArtist
