const Song = require('../../models/song')
const { mapCovers } = require('../utility/mapCovers')

const getSongs = async (req, res) => {
  try {
    const songs = await mapCovers(Song.find().populate('artist').lean().exec())

    res.status(200).json({
      songs
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: error.message })
  }
}

exports.getSongs = getSongs
