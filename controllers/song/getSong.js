const Song = require('../../models/song')
const { mapCover } = require('../utility/mapCover')

const getSong = async (req, res) => {
  try {
    const song = await mapCover(
      Song.findById(req.params.id).populate('artist').lean().exec()
    )

    res.status(200).json({ song })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: error.message })
  }
}

exports.getSong = getSong
