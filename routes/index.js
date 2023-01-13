const url = require("url");
const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const Artist = require("../models/artist");

const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  //  API PROXY

  let songs;
  let artists;
  let articlesList;

  try {
    let date = new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .slice(0, 10);

    let apiUrl = `https://newsapi.org/v2/everything?q=music&from=${date}&sortBy=relevancy&apiKey=${process.env.API_KEY}`;

    const apiRes = await fetch(apiUrl);
    const apiData = await apiRes.json();
    articlesList = await apiData.articles.slice(0, 8);

    artists = await Artist.find().limit(6).exec();
    songs = await Song.find().populate("artist").limit(10).exec();
  } catch (err) {
    console.log(err);
    songs = [];
    artists = [];
  }
  res.render("index", {
    articlesList: articlesList,
    songs: songs,
    artists: artists,
  });
});

router.post("/", async function (req, res) {
  let songs;
  let artists;
  let articlesList;
  let reqBodyVar = "music";

  try {
    let date = new Date(new Date().setDate(new Date().getDate() - 30))
      .toISOString()
      .slice(0, 10);

    if (req.body.music == "music") {
      reqBodyVar = "music";
    }
    if (req.body.songs == "songs") {
      reqBodyVar = "songs song chart top";
    }
    if (req.body.festivals == "festivals") {
      reqBodyVar = "festival tour band music";
    }
    if (req.body.classical == "classical") {
      reqBodyVar = "classical concert opera music";
    }
    if (req.body.artists == "artists") {
      reqBodyVar = "bands artist artists band music";
    }
    if (req.body.soundtracks == "soundtracks") {
      reqBodyVar = "soundtrack movie game music";
    }
    if (req.body.retro == "retro") {
      reqBodyVar = "old-music retro-music";
    }
    if (req.body.alternative == "alternative") {
      reqBodyVar = "music alternative";
    }

    let apiUrl = `https://newsapi.org/v2/everything?q=${reqBodyVar}&from=${date}&sortBy=relevancy&apiKey=${process.env.API_KEY}`;

    const apiRes = await fetch(apiUrl);
    const apiData = await apiRes.json();
    articlesList = await apiData.articles.slice(0, 8);

    artists = await Artist.find().limit(6).exec();
    songs = await Song.find().populate("artist").limit(10).exec();
  } catch (err) {
    console.log(err);
    songs = [];
    artists = [];
  }

  res.render("index", {
    articlesList: articlesList,
    songs: songs,
    artists: artists,
  });
});

module.exports = router;
