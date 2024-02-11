const Artist = require('../../models/artist')
const Song = require('../../models/song')

const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id)
    const songs = await Song.find({ artist: artist._id }).limit(1).exec()

    if (songs.length > 0) {
      res
        .status(400)
        .json({ error: 'You need to delete all songs of this artist first' })
    }

    const { _id } = await artist.remove()

    res.status(200).json({ _id: _id.toHexString() })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: error.message })
  }
}

exports.deleteArtist = deleteArtist
