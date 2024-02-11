const Artist = require('../../models/artist')
const Song = require('../../models/song')
const { mapCovers } = require('../utility/mapCovers')
const { getArticles } = require('./utility/getArticles')

const getAllData = async (req, res) => {
  try {
    const articles = await getArticles()
    const artists = await mapCovers(Artist.find().lean().exec())
    const songs = await mapCovers(Song.find().populate('artist').lean().exec())

    res.status(200).json({
      articles,
      artists,
      songs
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: error.message })
  }
}

exports.getAllData = getAllData
