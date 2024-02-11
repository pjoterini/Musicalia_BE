const Artist = require('../../models/artist')
const { mapCovers } = require('../utility/mapCovers')

const getArtists = async (req, res) => {
  try {
    const artists = await mapCovers(Artist.find().lean().exec())

    res.status(200).json({ artists })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getArtists
}
