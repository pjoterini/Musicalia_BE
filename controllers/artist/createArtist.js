const Artist = require('../../models/artist')
const { mapCover } = require('../utility/mapCover')

const createArtist = async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.file)

    const artist = await new Artist({
      name: req.body.name,
      genre: req.body.genre,
      rating: Number(req.body.rating),
      coverImage: req.file.buffer,
      coverImageType: req.file.mimetype
    })

    const { _id } = await artist.save()

    const createdArtist = await mapCover(
      Artist.findById(_id.toHexString()).lean().exec()
    )

    res.status(200).json({ createdArtist })
  } catch (err) {
    console.error(err)
    res.status(400).json({ error: error.message })
  }
}

exports.createArtist = createArtist
