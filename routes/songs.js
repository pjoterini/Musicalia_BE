const express = require('express')
const router = express.Router()
const { getSong } = require('../controllers/song/getSong')
const { getSongs } = require('../controllers/song/getSongs')
const { createSong } = require('../controllers/song/createSong')
const { updateSong } = require('../controllers/song/updateSong')
const { deleteSong } = require('../controllers/song/deleteSong')

router.get('/', getSongs)

router.post('/new', createSong)

router.get('/:id', getSong)
router.put('/:id', updateSong)
router.delete('/:id', deleteSong)

module.exports = router
