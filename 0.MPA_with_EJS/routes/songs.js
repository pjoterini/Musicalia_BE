const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const Artist = require("../models/artist");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

// ALL Songs Route
router.get("/", async (req, res) => {
  let query = Song.find().populate("artist");
  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }

  // REGEX FOR REFERENCE PROPERITIES NOT WORKING
  // if (req.query.artist != null && req.query.artist != '') {
  //     query = query.regex('artist.name', new RegExp(req.query.artist, 'i'))
  // }

  // if (req.query.genre != null && req.query.genre != '') {
  //     query = query.regex('genre', new RegExp(req.query.genre, 'i'))
  // }

  if (req.query.rating != null && req.query.rating != "") {
    query = Song.find({ rating: { $eq: req.query.rating } }).populate("artist");
  }
  try {
    const songs = await query.exec();

    res.render("songs/index", {
      songs: songs,
      searchOptions: req.query,
    });
  } catch (err) {
    res.redirect("/");
    console.log(err);
  }
});

// NEW Song Artist
router.get("/new", async (req, res) => {
  renderNewPage(res, new Song());
});

// CREATE Song Route
router.post("/", async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    genre: req.body.genre,
    rating: req.body.rating,
  });

  console.log("cover:", req.body);

  if (req.body.cover != "") {
    saveCover(song, req.body.cover);
  }

  try {
    const newSong = await song.save();
    res.redirect(`songs/${newSong.id}`);
  } catch (err) {
    renderNewPage(res, song, true);
    console.log(err);
  }
});

// Show song route
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate("artist").exec();
    res.render("songs/show", { song: song });
  } catch {
    res.redirect("/");
  }
});

// Edit song route
router.get("/:id/edit", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    renderEditPage(res, song);
  } catch {
    res.redirect("/");
  }
});

// Update song route
router.put("/:id", async (req, res) => {
  let song;
  try {
    song = await Song.findById(req.params.id);
    song.title = req.body.title;
    song.artist = req.body.artist;
    song.genre = req.body.genre;
    song.rating = req.body.rating;
    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(song, req.body.cover);
    }
    await song.save();
    res.redirect(`/songs/${song.id}`);
  } catch {
    if (song != null) {
      renderEditPage(res, song, true);
    } else {
      res.redirect("/");
    }
  }
});

// Delete Song page
router.delete("/:id", async (req, res) => {
  let song;
  try {
    song = await Song.findById(req.params.id);
    await song.remove();
    res.redirect("/songs");
  } catch (error) {
    if (song != null) {
      res.render("songs/show", {
        song: song,
        errorMessage: "could not remove song",
      });
    } else {
      res.redirect("/");
    }
  }
});

async function renderNewPage(res, song, hasError = false) {
  renderFormPage(res, song, "new", hasError);
}

async function renderEditPage(res, song, hasError = false) {
  renderFormPage(res, song, "edit", hasError);
}

async function renderFormPage(res, song, form, hasError = false) {
  try {
    const artists = await Artist.find({});
    const params = {
      artists: artists,
      song: song,
    };
    if (hasError) {
      if (form === "edit") {
        params.errorMessage = "Error Updating Song";
      } else {
        params.errorMessage =
          "Error Creating Song, all fields including cover(jpg.) must not be empty";
      }
    }
    res.render(`songs/${form}`, params);
  } catch {
    res.redirect("/songs");
  }
}

function saveCover(song, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    song.coverImage = new Buffer.from(cover.data, "base64");
    song.coverImageType = cover.type;
  }
}

module.exports = router;
