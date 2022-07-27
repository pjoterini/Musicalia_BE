const express = require('express')
const router = express.Router()
const Artist = require('../models/artist')
const Song = require('../models/song')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif',]

// ALL Artists Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const artists = await Artist.find(searchOptions)
        res.render('artists/index', {
            artists: artists,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// ADD New Artist Page
router.get('/new', (req, res) => {
    res.render('artists/new', { artist: new Artist() })
})

// CREATE Artist Route
router.post('/', async (req, res) => {
    const artist = new Artist({
       name: req.body.name, 
       genre: req.body.genre, 
       rating: req.body.rating 
    })
    saveCover(artist, req.body.cover)

    try {
        const newArtist = await artist.save()
         res.redirect(`artists/${newArtist.id}`)
    } catch {
        res.render('artists/new', {
            artist: artist,
            errorMessage: 'Error creating artist'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id)
        const songs = await Song.find({ artist: artist.id }).limit(6).exec()
        res.render('artists/show', {
            artist: artist,
            songsByArtist: songs
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id)
        res.render('artists/edit', { artist: artist })
    } catch {
        res.redirect('/')
    }
   
})

router.put('/:id', async (req, res) => {
    let artist
     try {
        artist = await Artist.findById(req.params.id)
        artist.name = req.body.name
        await artist.save()
        res.redirect(`/artists/${artist.id}`)
     } catch {
        if (artist == null) {
            res.redirect('/')
        } else {
            res.render('artists/edit', {
                artist: artist,
                errorMessage: 'Error up dating artist'
            })
        }
    }
})

router.delete('/:id', async (req, res) => {
    let artist
    try {
       artist = await Artist.findById(req.params.id)
       await artist.remove()
       res.redirect('/artists')
    } catch {
       if (artist == null) {
           res.redirect('/')
       } else {
           res.redirect(`/artists/${artist.id}`)
       }
   }
})

function saveCover(song, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        song.coverImage = new Buffer.from(cover.data, 'base64')
        song.coverImageType = cover.type
    }
}

module.exports = router