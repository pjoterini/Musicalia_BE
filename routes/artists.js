const express = require('express')
const router = express.Router()
const { createArtist } = require('../controllers/artist/createArtist')
const { deleteArtist } = require('../controllers/artist/deleteArtist')
const { getArtist } = require('../controllers/artist/getArtist')
const { getArtists } = require('../controllers/artist/getArtists')
const { updateArtist } = require('../controllers/artist/updateArtist')

router.get('/', getArtists)

router.post('/new', createArtist)

router.get('/:id', getArtist)
router.put('/:id', updateArtist)
router.delete('/:id', deleteArtist)

module.exports = router
