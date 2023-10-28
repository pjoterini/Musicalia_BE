const url = require('url')
const express = require('express')
const router = express.Router()
const Song = require('../models/song')
const Artist = require('../models/artist')
const fetch = require('node-fetch')

const lastTwentyDays = new Date(new Date().setDate(new Date().getDate() - 20))
  .toISOString()
  .slice(0, 10)

const getArticles = async (apiUrl) => {
  const apiRes = await fetch(apiUrl)
  const apiData = await apiRes.json()
  return apiData.articles.slice(0, 8)
}

router.get('/', async (req, res) => {
  let articlesList
  let artists
  let songs

  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=music&from=${lastTwentyDays}&sortBy=relevancy&apiKey=${process.env.API_KEY}`

    articlesList = await getArticles(apiUrl)

    artists = await Artist.find().limit(6).exec()
    songs = await Song.find().populate('artist').limit(10).exec()
    console.log(articlesList)
  } catch (err) {
    console.error(err)
    articlesList = []
    artists = []
    songs = []
  }
  res.render('index', {
    articlesList,
    artists,
    songs
  })
})

router.post('/', async function (req, res) {
  let articlesList
  let artists
  let songs

  try {
    console.log(req.body)
    if (req.body.music) {
      requestedArticles = 'music'
    } else if (req.body.songs) {
      requestedArticles = 'songs song chart top'
    } else if (req.body.festivals) {
      requestedArticles = 'festival tour band music'
    } else if (req.body.classical) {
      requestedArticles = 'classical concert opera music'
    } else if (req.body.artists) {
      requestedArticles = 'bands artist artists band music'
    } else if (req.body.soundtracks) {
      requestedArticles = 'soundtrack movie game music'
    } else if (req.body.retro) {
      requestedArticles = 'old-music retro-music'
    } else if (req.body.alternative) {
      requestedArticles = 'music alternative'
    }

    const apiUrl = `https://newsapi.org/v2/everything?q=${requestedArticles}&from=${lastTwentyDays}&sortBy=relevancy&apiKey=${process.env.API_KEY}`

    articlesList = await getArticles(apiUrl)

    artists = await Artist.find().limit(6).exec()
    songs = await Song.find().populate('artist').limit(10).exec()
  } catch (err) {
    console.error(err)
    articlesList = []
    songs = []
    artists = []
  }

  res.render('index', {
    articlesList,
    songs,
    artists
  })
})

module.exports = router
