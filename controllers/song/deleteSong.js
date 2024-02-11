const Song = require('../../models/song')

const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)

    const { _id } = await song.remove()

    res.status(200).json({ _id: _id.toHexString() })
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: error.message })
  }
}

exports.deleteSong = deleteSong
