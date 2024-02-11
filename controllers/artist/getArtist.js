const Artist = require('../../models/artist')
const Song = require('../../models/song')
const { mapCover } = require('../utility/mapCover')
const { mapCovers } = require('../utility/mapCovers')

const getArtist = async (req, res) => {
  try {
    const artist = await mapCover(Artist.findById(req.params.id).lean().exec())
    const songs = await mapCovers(
      Song.find({ artist: artist._id }).lean().populate('artist').exec()
    )

    res.status(200).json({
      artist,
      songs
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: error.message })
  }
}

exports.getArtist = getArtist
